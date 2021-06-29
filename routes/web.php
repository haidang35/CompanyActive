<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerDepartmentController;
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
Route::get('/manage-departments', [AdminController::class, "manage_departments"]);
Route::get('/form-create-department',[AdminController::class,"form_create_department"]);
Route::post('/save-department',[AdminController::class,"save_department"]);
Route::get('/edit-department/{department_id}',[AdminController::class,"edit_department"]);
Route::post('/update-department/{department_id}',[AdminController::class,"update_department"]);

    // Customer Route
Route::get('/customer-department',[CustomerDepartmentController::class,"customer_department"]);
Route::get('/create-appointment-schedule',[CustomerDepartmentController::class,"create_appointment_schedule"]);
Route::post('/save-appointment-schedule',[CustomerDepartmentController::class,"save_appointment_schedule"]);
