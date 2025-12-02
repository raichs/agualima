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
        'week_number',
        'year',
        'user_id',
    ];

    protected $casts = [
        'week_number' => 'integer',
        'year' => 'integer',
    ];

    /**
     * Relación con el usuario responsable
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación con filas de la matriz
     */
    public function rows(): HasMany
    {
        return $this->hasMany(HarvestMatrixRow::class);
    }

    /**
     * Scope para filtrar matrices
     */
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->whereHas('user', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'like', '%'.$search.'%');
                })
                ->orWhere('week_number', 'like', '%'.$search.'%')
                ->orWhere('year', 'like', '%'.$search.'%');
            });
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
        // TODO: Implementar cuando se agreguen campos de ejecución
        return 0;
    }

    /**
     * Verificar si tiene alertas activas
     */
    public function hasActiveAlerts(): bool
    {
        // TODO: Implementar cuando se agregue relación con programming
        return false;
    }
}
