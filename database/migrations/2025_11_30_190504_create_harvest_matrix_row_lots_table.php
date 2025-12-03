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
        Schema::create('harvest_matrix_row_lots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('harvest_matrix_row_id')->constrained('harvest_matrix_rows')->restrictOnDelete();
            $table->foreignId('lot_id')->constrained('lots')->restrictOnDelete();
            $table->unsignedInteger('lines');
            $table->decimal('total_kilos', 10, 2)->default(0);
            $table->decimal('kg_per_shift_avg', 10, 2)->default(0);
            $table->unsignedInteger('total_shifts')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('harvest_matrix_row_lots');
    }
};
