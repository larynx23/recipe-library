<?php

namespace Database\Seeders;

use App\Models\Recipe;
use App\Models\Ingredient;
use Illuminate\Database\Seeder;

class IngredientSeeder extends Seeder
{
    public function run(): void
    {
        Recipe::all()->each(function ($recipe) {
            Ingredient::factory()
                ->count(random_int(3, 10))
                ->create(['recipe_id' => $recipe->id]);
        });
    }
}