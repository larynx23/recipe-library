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

        $data = array_merge($request->all(), [
            'user_id' => Auth::id()
        ]);

        $recipe = Recipe::create($data);

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
        $recipe = Recipe::with(['steps', 'ingredients'])
            ->where('user_id', Auth::id())
            ->findOrFail($id);
        return response()->json($recipe);
    }

    public function update(Request $request, $id)
    {
        $recipe = Recipe::findOrFail($id);
        
        $recipe->update($request->except(['steps', 'ingredients']));

        if ($request->has('steps')) {
            $existingStepIds = $recipe->steps->pluck('id')->toArray();
            $newStepIds = [];
            foreach ($request->steps as $stepData) {
                if (isset($stepData['id'])) {
                    $step = Step::find($stepData['id']);
                    if ($step) {
                        $step->fill($stepData);
                        $step->save();
                        $newStepIds[] = $step->id;
                    }
                } else {
                    $step = new Step($stepData);
                    $recipe->steps()->save($step);
                    $newStepIds[] = $step->id;
                }
            }

            Step::whereIn('id', array_diff($existingStepIds, $newStepIds))
                ->where('recipe_id', $recipe->id)
                ->delete();
        }

        if ($request->has('ingredients')) {
            $existingIngredientIds = $recipe->ingredients->pluck('id')->toArray();
            $newIngredientIds = [];
            foreach ($request->ingredients as $ingredientData) {
                if (isset($ingredientData['id'])) {
                    $ingredient = Ingredient::find($ingredientData['id']);
                    if ($ingredient) {
                        $ingredient->fill($ingredientData);
                        $ingredient->save();
                        $newIngredientIds[] = $ingredient->id;
                    }
                } else {
                    $ingredient = new Ingredient($ingredientData);
                    $recipe->ingredients()->save($ingredient);
                    $newIngredientIds[] = $ingredient->id;
                }
            }

            Ingredient::whereIn('id', array_diff($existingIngredientIds, $newIngredientIds))
                ->where('recipe_id', $recipe->id)
                ->delete();
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
