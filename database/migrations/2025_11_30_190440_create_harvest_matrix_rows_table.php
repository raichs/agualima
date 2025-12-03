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
        Schema::create('harvest_matrix_rows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('harvest_matrix_id')->constrained('harvest_matrices')->restrictOnDelete();
            $table->foreignId('variety_id')->constrained('varieties')->restrictOnDelete();
            $table->foreignId('shift_id')->constrained('shifts')->restrictOnDelete();
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
        Schema::dropIfExists('harvest_matrix_rows');
    }
};
