<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Campaign extends Model implements Auditable
{
    use HasFactory, SoftDeletes, \OwenIt\Auditing\Auditable;

    // Status constants
    const STATUS_PLANIFICADA = 1;
    const STATUS_EN_PROGRESO = 2;
    const STATUS_CERRADA = 3;
    const STATUS_COMPLETADA = 4;
    const STATUS_CANCELADA = 5;

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'actual_end_date',
        'pruning_period_start',
        'pruning_period_end',
        'status',
        'target_total_kg',
        'actual_total_kg',
        'climate_notes',
        'agronomic_notes',
        'closing_notes',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'actual_end_date' => 'date',
            'pruning_period_start' => 'date',
            'pruning_period_end' => 'date',
            'target_total_kg' => 'decimal:2',
            'actual_total_kg' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get available campaign statuses.
     */
    public static function getStatuses(): array
    {
        return [
            self::STATUS_PLANIFICADA => 'Planificada',
            self::STATUS_EN_PROGRESO => 'En progreso',
            self::STATUS_CERRADA => 'Cerrada',
            self::STATUS_COMPLETADA => 'Completada',
            self::STATUS_CANCELADA => 'Cancelada',
        ];
    }

    /**
     * Get status label for a given status value.
     */
    public static function getStatusLabel(int $status): string
    {
        return self::getStatuses()[$status] ?? 'Desconocido';
    }

    /**
     * Get status options formatted for frontend (React Select).
     */
    public static function getStatusOptions(): array
    {
        $statuses = self::getStatuses();
        $options = [];

        foreach ($statuses as $value => $label) {
            $options[] = [
                'value' => $value,
                'label' => $label,
            ];
        }

        return $options;
    }

    /**
     * Scope a query to filter campaigns by search criteria.
     */
    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('name', 'like', '%'.$search.'%');
        });
    }
}
