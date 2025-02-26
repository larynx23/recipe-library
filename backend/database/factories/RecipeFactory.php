<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RecipeFactory extends Factory
{
    protected $recipeTypes = [
        1 => 'appetizer',
        2 => 'main',
        3 => 'dessert',
        4 => 'other'
    ];

    public function definition(): array
    {
        $type = $this->faker->numberBetween(1, 4);
        
        return [
            'name' => $this->faker->words(2, true),
            'type' => $type,
            'cost' => $this->faker->numberBetween(1, 3),
            'difficulty' => $this->faker->numberBetween(1, 3),
            'description' => $this->faker->paragraph,
            'prepare_time' => $this->faker->numberBetween(5, 20),
            'cooking_time' => $this->faker->numberBetween(10, 40),
            'image' => null,
            'default_serving' => $this->faker->numberBetween(2, 8),
            'user_id' => User::factory()
        ];
    }
}