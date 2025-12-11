<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Lot extends Model implements Auditable
{
    use HasFactory, SoftDeletes, \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'code',
        'name',
        'description',
        'lines',
    ];

    public function distributions()
    {
        return $this->hasMany(Distribution::class);
    }

    /**
     * Scope a query to filter lots by search criteria.
     */
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function($q) use ($search) {
                $q->where('code', 'like', '%'.$search.'%')
                  ->orWhere('name', 'like', '%'.$search.'%');
            });
        });
    }
}
