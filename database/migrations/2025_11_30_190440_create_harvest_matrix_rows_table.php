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
            $table->foreignId('harvest_matrix_id')->constrained('harvest_matrices')->onDelete('cascade');
            $table->foreignId('variety_id')->constrained('varieties')->onDelete('cascade');
            $table->foreignId('shift_id')->constrained('shifts')->onDelete('cascade');
            $table->decimal('total_kilos', 10, 2)->default(0);
            $table->decimal('kg_per_shift_avg', 10, 2)->default(0);
            $table->unsignedInteger('total_shifts')->default(0);
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
