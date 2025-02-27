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
            'name' => 'required|string|max:255',
            'type' => 'required|integer|between:1,3',
            'cost' => 'required|integer|between:1,3',
            'difficulty' => 'required|integer|between:1,3',
            'description' => 'required|string',
            'prepare_time' => 'required|integer|min:1',
            'cooking_time' => 'required|integer|min:0',
            'image' => 'nullable|string',
            'default_serving' => 'required|integer|min:1',
            'steps' => 'required|array|min:1',
            'steps.*.description' => 'required|string',
            'steps.*.index' => 'required|integer|min:1',
            'ingredients' => 'required|array|min:1',
            'ingredients.*.unit' => 'required|string',
            'ingredients.*.count' => 'required|numeric|min:0.1'
        ];

        if ($this->isMethod('PUT')) {
            return array_map(function ($rule) {
                return str_replace('required|', 'sometimes|', $rule);
            }, $rules);
        }

        return $rules;
    }
}
