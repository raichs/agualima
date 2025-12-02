<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HarvestMatrixRow extends Model
{
    protected $fillable = [
        'harvest_matrix_id',
        'variety_id',
        'shift_id',
        'total_kilos',
        'kg_per_shift_avg',
        'total_shifts',
    ];

    protected $casts = [
        'total_kilos' => 'decimal:2',
        'kg_per_shift_avg' => 'decimal:2',
        'total_shifts' => 'integer',
    ];

    /**
     * Relación con la matriz
     */
    public function harvestMatrix(): BelongsTo
    {
        return $this->belongsTo(HarvestMatrix::class);
    }

    /**
     * Relación con variedad
     */
    public function variety(): BelongsTo
    {
        return $this->belongsTo(Variety::class);
    }

    /**
     * Relación con turno
     */
    public function shift(): BelongsTo
    {
        return $this->belongsTo(Shift::class);
    }

    /**
     * Relación con lotes
     */
    public function lots(): HasMany
    {
        return $this->hasMany(HarvestMatrixRowLot::class);
    }

    /**
     * Relación con datos diarios
     */
    public function dailyData(): HasMany
    {
        return $this->hasMany(HarvestMatrixDailyData::class);
    }
}
