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
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->date('actual_end_date')->nullable();
            $table->date('pruning_period_start')->nullable(); // Inicio del período de poda
            $table->date('pruning_period_end')->nullable(); // Fin del período de poda
            $table->unsignedTinyInteger('status')->default(1); // 1: Planificada, 2: En progreso, 3: Cerrada, 4: Completada, 5: Cancelada
            $table->decimal('target_total_kg', 10, 2)->nullable(); // Objetivo de producción total (kg)
            $table->decimal('actual_total_kg', 10, 2)->nullable(); // Producción real total (kg)

            $table->text('climate_notes')->nullable(); // Notas sobre condiciones climáticas
            $table->text('agronomic_notes')->nullable(); // Notas agronómicas generales
            $table->text('closing_notes')->nullable(); // Observaciones al cerrar la campaña

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
        Schema::dropIfExists('campaigns');
    }
};
