<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HarvestMatrixResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'week_number' => $this->week_number,
            'year' => $this->year,
            'user' => $this->user ? [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ] : null,
            'dates' => $this->when(isset($this->dates), $this->dates),
            'rows' => $this->rows->map(function ($row) {
                return [
                    'id' => $row->id,
                    'variety_id' => $row->variety_id,
                    'shift_id' => $row->shift_id,
                    'variety' => $row->variety ? [
                        'id' => $row->variety->id,
                        'name' => $row->variety->name,
                    ] : null,
                    'shift' => $row->shift ? [
                        'id' => $row->shift->id,
                        'name' => $row->shift->name,
                    ] : null,
                    'lots' => $row->lots->map(function ($lot) {
                        return [
                            'id' => $lot->id,
                            'lot_id' => $lot->lot_id,
                            'lot' => $lot->lot ? [
                                'id' => $lot->lot->id,
                                'code' => $lot->lot->code,
                                'name' => $lot->lot->name,
                            ] : null,
                            'lines' => $lot->lines,
                            'total_kilos' => $lot->total_kilos,
                            'kg_per_shift_avg' => $lot->kg_per_shift_avg,
                            'total_shifts' => $lot->total_shifts,
                            'daily_data' => $lot->dailyData->map(function ($data) {
                                return [
                                    'day_of_week' => $data->day_of_week,
                                    'date' => $data->date?->format('Y-m-d'),
                                    'frequency' => $data->frequency,
                                    'kg_per_day' => $data->kg_per_day,
                                    'shifts' => $data->shifts,
                                ];
                            }),
                        ];
                    }),
                    'total_kilos' => $row->total_kilos,
                    'kg_per_shift_avg' => $row->kg_per_shift_avg,
                    'total_shifts' => $row->total_shifts,
                ];
            }),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}
