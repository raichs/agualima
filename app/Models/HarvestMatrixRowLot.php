<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HarvestMatrixRowLot extends Model
{
    protected $fillable = [
        'harvest_matrix_row_id',
        'lot_id',
        'lines',
        'total_kilos',
        'kg_per_shift_avg',
        'total_shifts',
    ];

    protected $casts = [
        'lines' => 'integer',
        'total_kilos' => 'decimal:2',
        'kg_per_shift_avg' => 'decimal:2',
        'total_shifts' => 'integer',
    ];

    /**
     * Relación con lote
     */
    public function lot(): BelongsTo
    {
        return $this->belongsTo(Lot::class);
    }

    /**
     * Relación con fila de matriz
     */
    public function harvestMatrixRow(): BelongsTo
    {
        return $this->belongsTo(HarvestMatrixRow::class);
    }

    /**
     * Relación con datos diarios
     */
    public function dailyData(): HasMany
    {
        return $this->hasMany(HarvestMatrixDailyData::class);
    }
}
