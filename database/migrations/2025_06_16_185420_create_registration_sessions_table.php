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
        Schema::create('registration_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained()->onDelete('cascade');
            $table->foreignId('event_session_id')->constrained()->onDelete('cascade');
            $table->boolean('attended')->default(false);
            $table->dateTime('checked_in_at')->nullable();
            $table->timestamps();

            // Make sure a session can only be registered once per registration
            $table->unique(['registration_id', 'event_session_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registration_sessions');
    }
};
