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
Route::middleware(["auth", "admin"])->group(function () {
    //Admin Route
    Route::get('/', [AdminController::class, "adminDashboard"]);

    // Department
    Route::get('/manage-departments', [AdminController::class, "manageDepartments"]);
    Route::get('/department-details/{department_id}', [AdminController::class, "departmentDetails"]);
    Route::get('/department-details/edit/{department_id}', [AdminController::class, "departmentEdit"]);
    Route::post('/department-details/update/{department_id}', [AdminController::class, "departmentUpdate"]);
    Route::get('/department/remove-member/{staff_id}', [AdminController::class, "departmentRemoveMember"]);
    Route::get('/department/add-member/{department_id}', [AdminController::class, "departmentAddMember"]);
    Route::get('/department/{department_id}/update-member/{staff_id}', [AdminController::class, "departmentUpdateMember"]);

    //Staff
    Route::get('/manage-staffs', [AdminController::class, "manageStaffs"]);
    Route::get('/manage-staffs/{staff_id}/details', [AdminController::class, "staffInfo"]);
    Route::get('/manage-staffs/{staff_id}/edit', [AdminController::class, "staffEditInfo"]);
    Route::post('/manage-staffs/{staff_id}/update', [AdminController::class, "staffUpdateInfo"]);
    Route::get('/manage-staffs/delete/{staff_id}', [AdminController::class, "deleteStaff"]);
    Route::get('/manage-staffs/add-new-staff', [AdminController::class, "addNewStaff"]);
    Route::post('/manage-staffs/new-staff', [AdminController::class, "updateNewStaff"]);
});



Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

