<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Distribution extends Model implements Auditable
{
    use HasFactory, SoftDeletes, \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'project_id',
        'variety_id',
        'shift_id',
        'lot_id',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function variety()
    {
        return $this->belongsTo(Variety::class);
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }

    public function lot()
    {
        return $this->belongsTo(Lot::class);
    }

    /**
     * Scope a query to filter distributions by search criteria.
     */
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->whereHas('project', function($q) use ($search) {
                $q->where('name', 'like', '%'.$search.'%');
            })
            ->orWhereHas('variety', function($q) use ($search) {
                $q->where('name', 'like', '%'.$search.'%');
            })
            ->orWhereHas('shift', function($q) use ($search) {
                $q->where('name', 'like', '%'.$search.'%');
            })
            ->orWhereHas('lot', function($q) use ($search) {
                $q->where('code', 'like', '%'.$search.'%');
            });
        });
    }
}
