<?php

namespace Database\Seeders;

use App\Models\Recipe;
use App\Models\Step;
use Illuminate\Database\Seeder;

class StepSeeder extends Seeder
{
    public function run(): void
    {
        Recipe::all()->each(function ($recipe) {
            Step::factory()
                ->count(random_int(3, 8))
                ->sequence(fn ($sequence) => ['index' => $sequence->index])
                ->create(['recipe_id' => $recipe->id]);
        });
    }
}