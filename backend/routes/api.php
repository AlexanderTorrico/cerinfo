<?php

use App\Http\Controllers\AuthController;
use App\Models\Area;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LanguageController;
use App\Http\Controllers\AreaController;

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
Route::post('/register', [AuthController::class, "register"]);


Route::get('language', [LanguageController::class,'index']);
Route::get('language/{id}', [LanguageController::class,'show']);
Route::post('language', [LanguageController::class,'store']);
Route::delete('language/{language}', [LanguageController::class,'destroy']);

Route::get('area', [AreaController::class,'index']);
Route::get('area/{id}', [AreaController::class,'show']);
Route::post('area', [AreaController::class,'store']);
Route::put('area/{id}',  function (Request $request, $id)
{
    $area = Area::findOrFail($id);
    $area->update($request->all());
    return $area;
});
Route::delete('area/{area}', [AreaController::class,'destroy']);
