<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GenderController;
use App\Http\Controllers\MaterialController;
use App\Models\Area;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Gender;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoriesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', [AuthController::class, "login"])->name('login');
Route::post('/registerAdministrator', [AuthController::class, "registerAdministrator"]);
Route::post('/registerMaster', [AuthController::class, "registerMaster"]);
Route::post('/registerAssistant', [AuthController::class, "registerAssistant"]);
Route::post('/registerStudent', [AuthController::class, "registerStudent"]);

//GENDER
Route::group(['middleware' => ['auth:api','role:Administrator']], function () {
    Route::resource("gender", GenderController::class);
});

//MATERIAL
Route::group(['middleware' => ['auth:api','role:Administrator']], function () {
    Route::resource("material", MaterialController::class);
});





Route::get('language', [LanguageController::class,'index']);
Route::get('language/{id}', [LanguageController::class,'show']);
Route::post('language', [LanguageController::class,'store']);
Route::put('language/{id}', [LanguageController::class,'update']);
Route::delete('language/{language}', [LanguageController::class,'destroy']);



Route::get('area', [AreaController::class,'index']);
Route::get('area/{id}', [AreaController::class,'show']);
Route::post('area', [AreaController::class,'store']);
Route::put('area/{id}', [AreaController::class,'update']);
Route::delete('area/{area}', [AreaController::class,'destroy']);



Route::get('autor', [AuthorController::class,'index']);
Route::get('autor/{id}', [AuthorController::class,'show']);
Route::post('autor', [AuthorController::class,'store']);
Route::put('autor/{id}', [AuthorController::class,'update']);
Route::delete('autor/{author}', [AuthorController::class,'destroy']);


Route::get('categoria', [CategoriesController::class,'index']);
Route::get('categoria/{id}', [CategoriesController::class,'show']);
Route::post('categoria', [CategoriesController::class,'store']);
Route::put('categoria/{id}', [CategoriesController::class,'update']);
Route::delete('categoria/{category}', [CategoriesController::class,'destroy']);
