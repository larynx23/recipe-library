<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;

class StepResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'index' => $this->index,
            'description' => $this->description,
        ];
    }
}