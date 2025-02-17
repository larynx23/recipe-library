<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $fillable = [
        'name',
        'type',
        'cost',
        'difficulty',
        'description',
        'prepare_time',
        'cooking_time',
        'time',
        'image',
        'default_serving',
        'user_id'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($recipe) {
            $recipe->time = $recipe->prepare_time + $recipe->cooking_time;
        });
    }

    public function ingredients()
    {
        return $this->hasMany(Ingredient::class);
    }

    public function steps()
    {
        return $this->hasMany(Step::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

