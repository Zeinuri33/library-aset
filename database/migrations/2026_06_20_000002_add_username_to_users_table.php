<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('username', 50)->unique()->nullable()->after('name');
        });

        // Set default usernames for existing users based on their email prefix
        DB::statement("UPDATE users SET username = SUBSTRING_INDEX(email, '@', 1) WHERE username IS NULL");

        // Make username non-nullable after populating
        Schema::table('users', function (Blueprint $table) {
            $table->string('username', 50)->unique()->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('username');
        });
    }
};
