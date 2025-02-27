<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Recipe extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'type',
        'cost',
        'difficulty',
        'description',
        'prepare_time',
        'cooking_time',
        'image',
        'default_serving',
        'user_id'
    ];

    protected $appends = ['time'];

    protected function time(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->prepare_time + $this->cooking_time,
        );
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

