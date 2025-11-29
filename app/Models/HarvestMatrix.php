<?php

namespace App\Models;

use App\Enums\MatrixStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class HarvestMatrix extends Model implements Auditable
{
    use SoftDeletes, \OwenIt\Auditing\Auditable;

    protected $fillable = [
        'name',
        'week_number',
        'year',
        'start_date',
        'end_date',
        'status',
        'kg_target',
        'kg_executed',
        'total_staff',
        'notes',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'kg_target' => 'decimal:2',
        'kg_executed' => 'decimal:2',
        'status' => MatrixStatusEnum::class,
    ];

    /**
     * Relación con programaciones diarias
     */
    public function programming(): HasMany
    {
        return $this->hasMany(HarvestProgramming::class);
    }

    /**
     * Usuario que creó la matriz
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Usuario que actualizó la matriz
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Scope para filtrar matrices
     */
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%'.$search.'%')
                    ->orWhere('week_number', 'like', '%'.$search.'%')
                    ->orWhere('year', 'like', '%'.$search.'%');
            });
        });

        $query->when($filters['status'] ?? null, function ($query, $status) {
            $query->where('status', $status);
        });

        $query->when($filters['year'] ?? null, function ($query, $year) {
            $query->where('year', $year);
        });
    }

    /**
     * Calcular porcentaje de cumplimiento
     */
    public function getCompletionPercentageAttribute(): float
    {
        if (!$this->kg_target || $this->kg_target == 0) {
            return 0;
        }
        return round(($this->kg_executed / $this->kg_target) * 100, 2);
    }

    /**
     * Verificar si tiene alertas activas
     */
    public function hasActiveAlerts(): bool
    {
        return $this->programming()->where('has_alert', true)->exists();
    }
}
