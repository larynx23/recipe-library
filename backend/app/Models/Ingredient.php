<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    protected $fillable = [
        'unit',
        'count',
        'recipe_id'
    ];

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}