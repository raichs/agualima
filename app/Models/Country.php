<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = [
        'name',
        'code',
    ];

    /**
     * Get the nurseries for the country.
     */
    public function nurseries()
    {
        return $this->hasMany(Nursery::class);
    }
}
