<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('harvest_matrix_daily_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('harvest_matrix_row_lot_id')->constrained('harvest_matrix_row_lots')->onDelete('cascade');
            $table->unsignedTinyInteger('day_of_week'); // 1=lunes, 2=martes, ..., 6=sábado
            $table->date('date');
            $table->decimal('frequency', 5, 2)->default(0);
            $table->decimal('kg_per_day', 10, 2)->default(0);
            $table->unsignedInteger('shifts')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('harvest_matrix_daily_data');
    }
};
