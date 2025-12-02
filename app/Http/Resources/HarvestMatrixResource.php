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
            'user' => $this->whenLoaded('user', fn() => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ]),
            'dates' => $this->when(isset($this->dates), $this->dates),
            'rows' => $this->whenLoaded('rows', function () {
                return $this->rows->map(function ($row) {
                    return [
                        'id' => $row->id,
                        'variety_id' => $row->variety_id,
                        'shift_id' => $row->shift_id,
                        'variety' => $row->whenLoaded('variety', fn() => [
                            'id' => $row->variety->id,
                            'name' => $row->variety->name,
                        ]),
                        'shift' => $row->whenLoaded('shift', fn() => [
                            'id' => $row->shift->id,
                            'name' => $row->shift->name,
                        ]),
                        'lots' => $row->whenLoaded('lots', function () use ($row) {
                            return $row->lots->map(function ($lot) {
                                return [
                                    'id' => $lot->id,
                                    'lot_id' => $lot->lot_id,
                                    'lot' => $lot->whenLoaded('lot', fn() => [
                                        'id' => $lot->lot->id,
                                        'code' => $lot->lot->code,
                                        'name' => $lot->lot->name,
                                    ]),
                                    'lines' => $lot->lines,
                                ];
                            });
                        }),
                        'total_kilos' => $row->total_kilos,
                        'kg_per_shift_avg' => $row->kg_per_shift_avg,
                        'total_shifts' => $row->total_shifts,
                        'daily_data' => $row->whenLoaded('dailyData', function () use ($row) {
                            return $row->dailyData->map(function ($data) {
                                return [
                                    'day_of_week' => $data->day_of_week,
                                    'date' => $data->date?->format('Y-m-d'),
                                    'frequency' => $data->frequency,
                                    'kg_per_day' => $data->kg_per_day,
                                    'shifts' => $data->shifts,
                                ];
                            });
                        }),
                    ];
                });
            }),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}
