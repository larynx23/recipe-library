<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\Step;
use App\Models\Ingredient;
use Illuminate\Support\Facades\Auth;



class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::with(['steps', 'ingredients'])->where('user_id', Auth::id())->get();
        return response()->json($recipes);
    }

    public function store(Request $request)
    {
        $recipeData = json_decode($request->recipe, true);
        
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/recipes', $filename);
            $recipeData['image'] = 'recipes/' . $filename;
        }

        $recipeData['user_id'] = Auth::id();
        $recipe = Recipe::create($recipeData);

        if (isset($recipeData['steps'])) {
            foreach ($recipeData['steps'] as $stepData) {
                $step = new Step($stepData);
                $recipe->steps()->save($step);
            }
        }

        if (isset($recipeData['ingredients'])) {
            foreach ($recipeData['ingredients'] as $ingredientData) {
                $ingredient = new Ingredient($ingredientData);
                $recipe->ingredients()->save($ingredient);
            }
        }

        return response()->json($recipe->load(['steps', 'ingredients']), 201);
    }

    public function show($id)
    {
        $recipe = Recipe::with(['steps', 'ingredients'])
            ->where('user_id', Auth::id())
            ->findOrFail($id);
        return response()->json($recipe);
    }

    public function update(Request $request, $id)
    {
        $recipeData = json_decode($request->recipe, true);

        $recipe = Recipe::where('user_id', Auth::id())->findOrFail($id);
        
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/recipes', $filename);
            $recipeData['image'] = 'recipes/' . $filename;
        }

        $recipe->update($recipeData);

        if (isset($recipeData['steps'])) {
            $recipe->steps()->delete();
            
            foreach ($recipeData['steps'] as $stepData) {
                $step = new Step($stepData);
                $recipe->steps()->save($step);
            }
        }

        if (isset($recipeData['ingredients'])) {
            $recipe->ingredients()->delete();
            
            foreach ($recipeData['ingredients'] as $ingredientData) {
                $ingredient = new Ingredient($ingredientData);
                $recipe->ingredients()->save($ingredient);
            }
        }

        return response()->json($recipe->load(['steps', 'ingredients']));
    }

    public function destroy($id)
    {
        $recipe = Recipe::where('user_id', Auth::id())->findOrFail($id);
        $recipe->delete();
        return response()->json(null, 204);
    }

}
