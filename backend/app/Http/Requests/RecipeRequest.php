<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class RecipeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules()
    {
        $rules = [
            'recipe' => 'required',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:2048'
        ];

        if ($this->isMethod('PUT')) {
            return $rules;
        }

        return $rules;
    }

    protected function passedValidation()
    {
        if ($this->has('recipe')) {
            $recipeData = json_decode($this->recipe, true);
            
            $validator = \Validator::make($recipeData, [
                'name' => 'required|string|max:255',
                'type' => 'required|integer|between:1,4',
                'cost' => 'integer|between:1,3',
                'difficulty' => 'required|integer|between:1,3',
                'description' => 'required|string',
                'prepare_time' => 'integer',
                'cooking_time' => 'integer',
                'default_serving' => 'integer',
                'steps' => 'array',
                'steps.*.description' => 'string',
                'steps.*.index' => 'integer',
                'ingredients' => 'array',
                'ingredients.*.unit' => 'string',
                'ingredients.*.count' => 'numeric'
            ]);

            if ($validator->fails()) {
                throw new \Illuminate\Validation\ValidationException($validator);
            }
        }
    }
}
