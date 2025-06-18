<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, check if the table has the old structure
        if (Schema::hasColumn('event_sessions', 'title') && 
            Schema::hasColumn('event_sessions', 'startTime') && 
            Schema::hasColumn('event_sessions', 'endTime')) {
            
            // Rename columns to match the new structure
            Schema::table('event_sessions', function (Blueprint $table) {
                $table->renameColumn('title', 'name');
                $table->renameColumn('startTime', 'start_time');
                $table->renameColumn('endTime', 'end_time');
            });
            
            // Add new columns
            Schema::table('event_sessions', function (Blueprint $table) {
                $table->text('description')->nullable()->after('name');
                $table->integer('capacity')->nullable()->after('end_time');
                $table->boolean('is_full_day')->default(false)->after('capacity');
            });
            
            // Change column types if needed
            DB::statement('ALTER TABLE event_sessions MODIFY start_time DATETIME NOT NULL');
            DB::statement('ALTER TABLE event_sessions MODIFY end_time DATETIME NOT NULL');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('event_sessions', 'name') && 
            Schema::hasColumn('event_sessions', 'start_time') && 
            Schema::hasColumn('event_sessions', 'end_time')) {
            
            // Remove new columns
            Schema::table('event_sessions', function (Blueprint $table) {
                $table->dropColumn('description');
                $table->dropColumn('capacity');
                $table->dropColumn('is_full_day');
            });
            
            // Rename columns back to the old structure
            Schema::table('event_sessions', function (Blueprint $table) {
                $table->renameColumn('name', 'title');
                $table->renameColumn('start_time', 'startTime');
                $table->renameColumn('end_time', 'endTime');
            });
            
            // Change column types back if needed
            DB::statement('ALTER TABLE event_sessions MODIFY startTime TIME NOT NULL');
            DB::statement('ALTER TABLE event_sessions MODIFY endTime TIME NOT NULL');
        }
    }
};
