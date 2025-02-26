<?php

namespace Database\Factories;

use App\Models\Recipe;
use Illuminate\Database\Eloquent\Factories\Factory;

class IngredientFactory extends Factory
{
    public function definition(): array
    {
        return [
            'recipe_id' => Recipe::factory(),
            'count' => $this->faker->randomFloat(2, 0.5, 1000),
            'unit' => $this->faker->randomElement(['g', 'kg', 'ml', 'l', 'db', 'ek', 'tk', 'csipet'])
        ];
    }
}