<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Nursery extends Model implements Auditable
{
    use HasFactory, SoftDeletes, \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'name',
        'description',
        'country_id',
    ];

    /**
     * Get the country that owns the nursery.
     */
    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
