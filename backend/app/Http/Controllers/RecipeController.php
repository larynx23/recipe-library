<?php

namespace App\Http\Controllers;

use App\Http\Requests\RecipeRequest;
use App\Http\Resources\RecipeResource;
use App\Models\Recipe;
use App\Models\Step;
use App\Models\Ingredient;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::with(['steps', 'ingredients'])
            ->where('user_id', Auth::id())
            ->get();
        
        return RecipeResource::collection($recipes);
    }

    public function store(RecipeRequest $request)
    {
        $recipeData = json_decode($request->recipe, true);
        $recipeData['user_id'] = Auth::id();
        $recipeData['image'] = null;
        
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            
            $directory = storage_path('app/public/recipes');
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }
            
            $file->move($directory, $filename);
            $recipeData['image'] = 'recipes/' . $filename;
        }

        $recipe = Recipe::create($recipeData);

        foreach ($recipeData['steps'] as $stepData) {
            $recipe->steps()->create($stepData);
        }

        foreach ($recipeData['ingredients'] as $ingredientData) {
            $recipe->ingredients()->create($ingredientData);
        }

        return (new RecipeResource($recipe->load(['steps', 'ingredients'])))
            ->response()
            ->setStatusCode(201);
    }

    public function show($id)
    {
        $recipe = Recipe::with(['steps', 'ingredients'])
            ->where('user_id', Auth::id())
            ->findOrFail($id);
            
        return new RecipeResource($recipe);
    }

    public function update(RecipeRequest $request, $id)
    {
        $recipe = Recipe::where('user_id', Auth::id())->findOrFail($id);
        $recipeData = json_decode($request->recipe, true);
        
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            
            $directory = storage_path('app/public/recipes');
            if (!file_exists($directory)) {
                mkdir($directory, 0755, true);
            }
            
            $file->move($directory, $filename);
            $recipeData['image'] = 'recipes/' . $filename;
        }

        $recipe->update($recipeData);

        if (isset($recipeData['steps'])) {
            $recipe->steps()->delete();
            foreach ($recipeData['steps'] as $stepData) {
                $recipe->steps()->create($stepData);
            }
        }

        if (isset($recipeData['ingredients'])) {
            $recipe->ingredients()->delete();
            foreach ($recipeData['ingredients'] as $ingredientData) {
                $recipe->ingredients()->create($ingredientData);
            }
        }

        return new RecipeResource($recipe->load(['steps', 'ingredients']));
    }

    public function destroy($id)
    {
        $recipe = Recipe::where('user_id', Auth::id())->findOrFail($id);
        $recipe->delete();
        return response()->json(null, 204);
    }
}
