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
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('label');
            $table->boolean('is_title')->default(false);
            $table->string('icon')->nullable();
            $table->string('url')->nullable();
            $table->json('badge')->nullable(); // Para badge: {text, variant}
            $table->string('badge_icon')->nullable();
            $table->string('permission')->nullable(); // Permiso requerido
            $table->foreignId('parent_id')->nullable()->constrained('menus')->onDelete('cascade');
            $table->string('target')->nullable(); // _blank, _self, etc.
            $table->boolean('is_disabled')->default(false);
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};
