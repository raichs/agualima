<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use OwenIt\Auditing\Contracts\Auditable;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole implements Auditable
{
    use HasFactory, \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'name',
        'display_name',
        'description',
        'guard_name',
    ];

    /**
     * Scope a query to filter roles by search criteria.
     */
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%'.$search.'%')
                  ->orWhere('display_name', 'like', '%'.$search.'%')
                  ->orWhere('description', 'like', '%'.$search.'%');
            });
        });
    }

    /**
     * Get the label attribute for display
     */
    public function getLabelAttribute(): string
    {
        return $this->display_name;
    }
}