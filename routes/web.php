<?php

use Illuminate\Support\Facades\Route;

Route::get("/", function () {
    return redirect()->route("login");
});

Route::get("run-setup-temp", function () {
    $output = [];
    $output[] = "=== Starting Spatie Setup (ignore-platform-req) ===";

    exec("cd /var/www/html && export COMPOSER_HOME=/tmp && composer require spatie/laravel-permission --ignore-platform-req=php --with-all-dependencies 2>&1", $out1, $code1);
    $output[] = "Composer require code: " . $code1 . "\n" . implode("\n", $out1);

    if ($code1 === 0) {
        exec('php /var/www/html/artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider" 2>&1', $out2, $code2);
        $output[] = "Publish config code: " . $code2 . "\n" . implode("\n", $out2);

        exec("php /var/www/html/artisan migrate 2>&1", $out3, $code3);
        $output[] = "Artisan migrate code: " . $code3 . "\n" . implode("\n", $out3);
    }

    return response(implode("\n\n", $output), 200, ["Content-Type" => "text/plain"]);
});

Route::get("run-seeder-temp", function () {
    $output = [];
    $output[] = "=== Starting Spatie Seeding ===";

    exec("php /var/www/html/artisan db:seed --class=RolePermissionSeeder 2>&1", $out, $code);
    $output[] = "Seeding code: " . $code . "\n" . implode("\n", $out);

    return response(implode("\n\n", $output), 200, ["Content-Type" => "text/plain"]);
});

Route::get("read-composer-json", function () {
    return response()->file("/var/www/html/composer.json");
});

Route::middleware(["auth", "verified"])->group(function () {
    Route::get("dashboard", [\App\Http\Controllers\DashboardController::class, "index"])->name("dashboard");
    Route::resource("users", \App\Http\Controllers\UserController::class)->except(["create", "show", "edit"]);
    Route::resource("kategori", \App\Http\Controllers\KategoriController::class)->except(["create", "show", "edit"]);
    Route::resource("ruang", \App\Http\Controllers\RuangController::class)->except(["create", "show", "edit"]);
    Route::resource("barang", \App\Http\Controllers\BarangController::class)->except(["create", "show", "edit"]);

    Route::get("unit-barang/lookup", [\App\Http\Controllers\UnitBarangController::class, "lookup"])->name("unit-barang.lookup");
    Route::resource("unit-barang", \App\Http\Controllers\UnitBarangController::class)->except(["create", "edit"]);
    Route::get("scan", function () {
        return \Inertia\Inertia::render("scan");
    })->name("scan");
    Route::resource("sumber-dana", \App\Http\Controllers\SumberDanaController::class)->except(["create", "show", "edit"]);
    Route::resource("pemeliharaan", \App\Http\Controllers\PemeliharaanController::class)->except(["create", "show", "edit"]);
    Route::get("inventory/labels", [\App\Http\Controllers\UnitBarangController::class, "labels"])->name("inventory.labels");
    Route::get("inventory/labels/print", [\App\Http\Controllers\UnitBarangController::class, "printLabels"])->name("inventory.labels.print");

    
    Route::get("inventory/import", [\App\Http\Controllers\ImportController::class, "index"])->name("inventory.import");
    Route::post("inventory/import/preview", [\App\Http\Controllers\ImportController::class, "preview"])->name("inventory.import.preview");
    Route::post("inventory/import/process", [\App\Http\Controllers\ImportController::class, "import"])->name("inventory.import.process");
    Route::get("inventory/import/template", [\App\Http\Controllers\ImportController::class, "template"])->name("inventory.import.template");
});

require __DIR__ . "/settings.php";
