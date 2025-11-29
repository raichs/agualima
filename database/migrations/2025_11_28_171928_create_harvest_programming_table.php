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
        Schema::create('harvest_programming', function (Blueprint $table) {
            $table->id();
            $table->foreignId('harvest_matrix_id')->constrained()->cascadeOnDelete();
            $table->foreignId('distribution_id')->constrained()->cascadeOnDelete();
            $table->date('date'); // Fecha específica de programación
            
            // Proyección
            $table->decimal('kg_projected', 10, 2)->default(0); // Kg proyectados para este día
            $table->integer('staff_projected')->default(0); // Jornales proyectados
            $table->decimal('ratio_kg_per_jornal', 8, 2)->nullable(); // Ratio Kg/Jornal usado
            
            // Ejecución (se llena con integración Agualima)
            $table->decimal('kg_executed', 10, 2)->default(0); // Kg reales ejecutados
            $table->integer('staff_executed')->default(0); // Jornales reales ejecutados
            $table->decimal('real_ratio_kg_per_jornal', 8, 2)->nullable(); // Ratio real del día
            
            // Frecuencia y control
            $table->integer('frequency_days')->nullable(); // Frecuencia de corte en días
            $table->date('last_harvest_date')->nullable(); // Último corte anterior
            $table->date('next_harvest_date')->nullable(); // Próximo corte estimado
            
            // Desviaciones y métricas
            $table->decimal('deviation_percentage', 5, 2)->default(0); // % desviación
            $table->boolean('has_alert')->default(false); // Si tiene alertas activas
            $table->text('notes')->nullable();
            
            $table->timestamps();
            
            // Indices
            $table->unique(['harvest_matrix_id', 'distribution_id', 'date'], 'hp_matrix_dist_date_unique');
            $table->index('date');
            $table->index('has_alert');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('harvest_programming');
    }
};
