<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Recipe;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class RecipeTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private string $token;
    private array $validRecipeData;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->token = $this->user->createToken('test')->plainTextToken;
        
        $this->validRecipeData = [
            'recipe' => json_encode([
                'name' => 'Test Recipe',
                'type' => 1,
                'cost' => 2,
                'difficulty' => 1,
                'description' => 'Test description',
                'prepare_time' => 30,
                'cooking_time' => 45,
                'default_serving' => 4,
                'steps' => [
                    ['index' => 1, 'description' => 'Step 1'],
                    ['index' => 2, 'description' => 'Step 2']
                ],
                'ingredients' => [
                    ['unit' => 'g', 'count' => 100],
                    ['unit' => 'ml', 'count' => 200]
                ]
            ])
        ];
    }

    /** @test */
    public function user_can_create_recipe_with_valid_data()
    {
        Storage::fake('public');
        
        $data = $this->validRecipeData;
        $data['image'] = UploadedFile::fake()->image('recipe.jpg');

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/recipes', $data);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'type',
                    'time',
                    'steps',
                    'ingredients'
                ]
            ]);

        $recipeData = json_decode($this->validRecipeData['recipe'], true);
        $this->assertDatabaseHas('recipes', [
            'name' => $recipeData['name'],
            'user_id' => $this->user->id
        ]);
    }

    /** @test */
    public function recipe_creation_fails_with_invalid_data()
    {
        $invalidData = [
            'recipe' => json_encode([
                'name' => 'Test Recipe',
                'type' => 999,
                'cost' => 2,
                'difficulty' => 1,
                'description' => 'Test description',
                'prepare_time' => 30,
                'cooking_time' => 45,
                'default_serving' => 4,
                'steps' => [
                    ['index' => 1, 'description' => 'Step 1']
                ],
                'ingredients' => [
                    ['unit' => 'g', 'count' => 100]
                ]
            ])
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/recipes', $invalidData);

        $response->assertStatus(422);
    }


    /** @test */
    public function user_can_view_own_recipes()
    {
        Recipe::factory(3)->create(['user_id' => $this->user->id]);
        Recipe::factory(2)->create();

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->getJson('/api/recipes');

        $response->assertOk()
            ->assertJsonStructure(['data'])
            ->assertJsonCount(3, 'data');
    }

    /** @test */
    public function user_can_update_own_recipe()
    {
        $recipe = Recipe::factory()->create([
            'user_id' => $this->user->id
        ]);

        $updateData = [
            'recipe' => json_encode([
                'name' => 'Updated Recipe Name',
                'type' => 1,
                'cost' => 2,
                'difficulty' => 1,
                'description' => 'Test description',
                'prepare_time' => 30,
                'cooking_time' => 45,
                'default_serving' => 4,
                'steps' => [
                    ['index' => 1, 'description' => 'Step 1']
                ],
                'ingredients' => [
                    ['unit' => 'g', 'count' => 100]
                ]
            ])
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->putJson("/api/recipes/{$recipe->id}", $updateData);

        $response->assertOk()
            ->assertJsonFragment(['name' => 'Updated Recipe Name']);
    }

    /** @test */
    public function user_cannot_update_others_recipe()
    {
        $otherRecipe = Recipe::factory()->create();

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->putJson("/api/recipes/{$otherRecipe->id}", $this->validRecipeData);

        $response->assertNotFound();
    }

    /** @test */
    public function user_can_delete_own_recipe()
    {
        $recipe = Recipe::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->deleteJson("/api/recipes/{$recipe->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('recipes', ['id' => $recipe->id]);
    }

    /** @test */
    public function time_is_calculated_automatically()
    {
        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/recipes', $this->validRecipeData);

        $responseData = $response->json('data');
        
        $this->assertEquals(
            75, // 30 + 45
            $responseData['time'],
            'Time should be the sum of prepare_time and cooking_time'
        );

        $this->assertDatabaseHas('recipes', [
            'id' => $responseData['id'],
            'prepare_time' => 30,
            'cooking_time' => 45
        ]);
    }

    /** @test */
    public function recipe_values_must_be_within_valid_ranges()
    {
        $invalidData = [
            'recipe' => json_encode([
                'name' => 'Test Recipe',
                'type' => 5,        // Invalid type
                'cost' => 5,        // Invalid cost
                'difficulty' => 0,   // Invalid difficulty
                'prepare_time' => -1, // Invalid prepare time
                'default_serving' => 0, // Invalid serving
                'description' => 'Test description',
                'cooking_time' => 45,
                'steps' => [
                    ['index' => 1, 'description' => 'Step 1']
                ],
                'ingredients' => [
                    ['unit' => 'g', 'count' => 100]
                ]
            ])
        ];

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->postJson('/api/recipes', $invalidData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['type', 'cost', 'difficulty']);
    }

    /** @test */
    public function user_can_update_recipe_with_image()
    {
        Storage::fake('public');
        
        $recipe = Recipe::factory()->create([
            'user_id' => $this->user->id
        ]);

        $updateData = $this->validRecipeData;
        $updateData['image'] = UploadedFile::fake()->image('recipe.jpg');

        $response = $this->withHeader('Authorization', 'Bearer ' . $this->token)
            ->putJson("/api/recipes/{$recipe->id}", $updateData);

        $response->assertOk();
        
        $updatedRecipe = $recipe->fresh();
        $this->assertNotNull($updatedRecipe->image);
        
        $this->assertStringStartsWith('recipes/', $updatedRecipe->image);
    }
}