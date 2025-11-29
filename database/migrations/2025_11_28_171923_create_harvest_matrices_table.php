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
        Schema::create('harvest_matrices', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Ej: "Matriz Semana 48 - 2025"
            $table->integer('week_number'); // Número de semana (1-52)
            $table->integer('year'); // Año
            $table->date('start_date'); // Inicio de la semana (Lunes)
            $table->date('end_date'); // Fin de la semana (Domingo)
            $table->enum('status', ['draft', 'active', 'completed', 'cancelled'])->default('draft');
            $table->decimal('kg_target', 12, 2)->nullable(); // Kg objetivo semanal
            $table->decimal('kg_executed', 12, 2)->default(0); // Kg ejecutados (acumulado)
            $table->integer('total_staff')->nullable(); // Personal total disponible
            $table->text('notes')->nullable(); // Observaciones
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            
            // Indices
            $table->unique(['week_number', 'year']);
            $table->index('status');
            $table->index('start_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('harvest_matrices');
    }
};
