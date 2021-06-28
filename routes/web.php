<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Admin Route
Route::get('/admin', [AdminController::class, "admin_dashboard"]);

// Department
Route::get('/manage-departments', [AdminController::class, "manage_departments"]);
Route::get('/department-details/{department_id}', [AdminController::class, "department_details"]);
Route::get('/department-details/edit/{department_id}', [AdminController::class, "department_edit"]);
Route::post('/department-details/update/{department_id}', [AdminController::class, "department_update"]);
Route::get('/department/remove-member/{staff_id}', [AdminController::class, "department_remove_member"]);
Route::get('/department/add-member/{department_id}', [AdminController::class, "department_add_member"]);
Route::get('/department/{department_id}/update-member/{staff_id}', [AdminController::class, "department_update_member"]);
