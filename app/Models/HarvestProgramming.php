<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use OwenIt\Auditing\Contracts\Auditable;

class HarvestProgramming extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    protected $table = 'harvest_programming';

    protected $fillable = [
        'harvest_matrix_id',
        'distribution_id',
        'date',
        'kg_projected',
        'staff_projected',
        'ratio_kg_per_jornal',
        'kg_executed',
        'staff_executed',
        'real_ratio_kg_per_jornal',
        'frequency_days',
        'last_harvest_date',
        'next_harvest_date',
        'deviation_percentage',
        'has_alert',
        'notes',
    ];

    protected $casts = [
        'date' => 'date',
        'last_harvest_date' => 'date',
        'next_harvest_date' => 'date',
        'kg_projected' => 'decimal:2',
        'kg_executed' => 'decimal:2',
        'ratio_kg_per_jornal' => 'decimal:2',
        'real_ratio_kg_per_jornal' => 'decimal:2',
        'deviation_percentage' => 'decimal:2',
        'has_alert' => 'boolean',
    ];

    /**
     * Relación con la matriz de cosecha
     */
    public function matrix(): BelongsTo
    {
        return $this->belongsTo(HarvestMatrix::class, 'harvest_matrix_id');
    }

    /**
     * Relación con la distribución (proyecto-variedad-turno-lote)
     */
    public function distribution(): BelongsTo
    {
        return $this->belongsTo(Distribution::class);
    }

    /**
     * Calcular desviación automáticamente
     */
    public function calculateDeviation(): void
    {
        if ($this->kg_projected > 0) {
            $this->deviation_percentage = round(
                (($this->kg_executed - $this->kg_projected) / $this->kg_projected) * 100,
                2
            );
        }
    }

    /**
     * Verificar si necesita alerta
     */
    public function needsAlert(): bool
    {
        // Alerta si desviación > 15%
        return abs($this->deviation_percentage) > 15;
    }

    /**
     * Scope para programaciones de una fecha específica
     */
    public function scopeForDate($query, $date)
    {
        return $query->where('date', $date);
    }

    /**
     * Scope para programaciones con alertas
     */
    public function scopeWithAlerts($query)
    {
        return $query->where('has_alert', true);
    }
}
