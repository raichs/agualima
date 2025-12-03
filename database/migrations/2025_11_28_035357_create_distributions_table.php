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
        Schema::create('distributions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->restrictOnDelete();
            $table->foreignId('variety_id')->constrained()->restrictOnDelete();
            $table->foreignId('shift_id')->constrained()->restrictOnDelete();
            $table->foreignId('lot_id')->constrained()->restrictOnDelete();
            $table->decimal('total_area', 10, 2)->nullable();
            $table->integer('campaign_number')->nullable();
            $table->decimal('density', 10, 2)->nullable();
            $table->date('planting_date')->nullable();
            $table->date('pruning_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            // Unique constraint para evitar duplicados
            $table->unique(['project_id', 'variety_id', 'shift_id', 'lot_id'], 'unique_distribution');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('distributions');
    }
};
