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
        Schema::table('events', function (Blueprint $table) {
            $table->string('organizer')->nullable()->after('title');
            $table->time('time')->nullable()->after('date');
            $table->decimal('ticket_price', 10, 2)->nullable()->after('location');
            $table->string('photo_url')->nullable()->after('logo_url');
            $table->boolean('is_hero')->default(false)->after('secondary_color');
            $table->enum('event_type', ['regular', 'concert'])->default('regular')->after('is_hero');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(['organizer', 'time', 'ticket_price', 'photo_url', 'is_hero', 'event_type']);
        });
    }
};
