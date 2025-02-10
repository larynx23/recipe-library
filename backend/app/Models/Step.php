<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Step extends Model
{
    protected $fillable = [
        'recipe_id',
        'index',
        'description'
    ];

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}