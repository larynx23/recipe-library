<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;

class RecipeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'cost' => $this->cost,
            'difficulty' => $this->difficulty,
            'description' => $this->description,
            'prepare_time' => $this->prepare_time,
            'cooking_time' => $this->cooking_time,
            'time' => $this->prepare_time + $this->cooking_time,
            'image' => $this->image,
            'default_serving' => $this->default_serving,
            'steps' => StepResource::collection($this->whenLoaded('steps')),
            'ingredients' => IngredientResource::collection($this->whenLoaded('ingredients')),
        ];
    }
}