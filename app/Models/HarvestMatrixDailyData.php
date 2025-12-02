<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HarvestMatrixDailyData extends Model
{
    protected $fillable = [
        'harvest_matrix_row_lot_id',
        'day_of_week',
        'date',
        'frequency',
        'kg_per_day',
        'shifts',
    ];

    protected $casts = [
        'day_of_week' => 'integer',
        'date' => 'date',
        'frequency' => 'decimal:2',
        'kg_per_day' => 'decimal:2',
        'shifts' => 'integer',
    ];

    /**
     * Relación con lote de fila de matriz
     */
    public function harvestMatrixRowLot(): BelongsTo
    {
        return $this->belongsTo(HarvestMatrixRowLot::class);
    }
}
