<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;

class IngredientResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'unit' => $this->unit,
            'count' => $this->count,
        ];
    }
}