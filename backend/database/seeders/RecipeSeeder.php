<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Recipe;
use App\Models\Ingredient;
use App\Models\Step;
use App\Models\User;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $testUser = User::where('name', 'Test User')->first();

        Recipe::factory(5)
            ->for($testUser)
            ->has(
                Ingredient::factory()->count(5)
            )
            ->has(
                Step::factory()
                    ->count(5)
                    ->sequence(fn($sequence) => ['index' => $sequence->index + 1])
            )
            ->create();

        User::where('name', '!=', 'Test User')->each(function ($user) {
            Recipe::factory(3)
                ->for($user)
                ->has(
                    Ingredient::factory()
                        ->count(rand(3, 8))
                )
                ->has(
                    Step::factory()
                        ->count(rand(3, 8))
                        ->sequence(fn($sequence) => ['index' => $sequence->index + 1])
                )
                ->create();
        });
    }
}