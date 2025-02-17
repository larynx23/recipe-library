<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\Step;
use App\Models\Ingredient;



class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
        ]);

        $userId = $request->input('user_id');
        $recipes = Recipe::with(['steps', 'ingredients'])->where('user_id', $userId)->get();
        return response()->json($recipes);
    }

    public function store(Request $request)
    {
        $recipe = Recipe::create($request->all());

        if ($request->has('steps')) {
            foreach ($request->steps as $stepData) {
                $step = new Step($stepData);
                $recipe->steps()->save($step);
            }
        }

        if ($request->has('ingredients')) {
            foreach ($request->ingredients as $ingredientData) {
                $ingredient = new Ingredient($ingredientData);
                $recipe->ingredients()->save($ingredient);
            }
        }

        return response()->json($recipe->load(['steps', 'ingredients']), 201);
    }

    public function show($id)
    {
        $recipe = Recipe::with(['steps', 'ingredients'])->findOrFail($id);
        return response()->json($recipe);
    }

    public function update(Request $request, $id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->update($request->all());

        if ($request->has('steps')) {
            foreach ($request->steps as $stepData) {
                $step = Step::findOrNew($stepData['id'] ?? null);
                $step->fill($stepData);
                $recipe->steps()->save($step);
            }
        }

        if ($request->has('ingredients')) {
            foreach ($request->ingredients as $ingredientData) {
                $ingredient = Ingredient::findOrNew($ingredientData['id'] ?? null);
                $ingredient->fill($ingredientData);
                $recipe->ingredients()->save($ingredient);
            }
        }

        return response()->json($recipe->load(['steps', 'ingredients']));
    }

    public function destroy($id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->delete();
        return response()->json(null, 204);
    }

}
