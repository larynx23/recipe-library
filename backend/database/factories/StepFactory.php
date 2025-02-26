<?php

namespace Database\Factories;

use App\Models\Recipe;
use Illuminate\Database\Eloquent\Factories\Factory;

class StepFactory extends Factory
{
    public function definition(): array
    {
        return [
            'recipe_id' => Recipe::factory(),
            'index' => $this->faker->numberBetween(1, 10),
            'description' => $this->faker->paragraph
        ];
    }
}