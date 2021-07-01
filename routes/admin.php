<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\AppointmentController;
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
    Route::get('/logout', [AdminController::class, "adminLogout"]);

    // Department
    Route::get('/manage-departments', [DepartmentController::class, "manageDepartments"]);
    Route::get('/department-details/{department_id}', [DepartmentController::class, "departmentDetails"]);
    Route::get('/department-details/edit/{department_id}', [DepartmentController::class, "departmentEdit"]);
    Route::post('/department-details/update/{department_id}', [DepartmentController::class, "departmentUpdate"]);
    Route::get('/department/remove-member/{staff_id}', [DepartmentController::class, "departmentRemoveMember"]);
    Route::get('/department/{department_id}/remove-all', [DepartmentController::class, "removeAllMember"]);
    Route::get('/department/add-member/{department_id}', [DepartmentController::class, "departmentAddMember"]);
    Route::get('/department/{department_id}/update-member/{staff_id}', [DepartmentController::class, "departmentUpdateMember"]);
    Route::get('/manage-departments/add-new', [DepartmentController::class, "addNewDepartment"]);
    Route::post('/manage-departments/save', [DepartmentController::class, "saveNewDepartment"]);
    Route::get('/manage-departments/delete/{department_id}', [DepartmentController::class, "deleteDepartment"]);
    Route::get('/manage-departments/restore/{department_id}', [DepartmentController::class, "restoreDepartment"]);
    Route::get('/manage-departments/{department_id}/restore-members', [DepartmentController::class, "restoreAllMember"]);
    Route::get('/manage-departments/{department_id}/restore/{staff_id}', [DepartmentController::class, "restoreMember"]);

    //Staff
    Route::get('/manage-staffs', [StaffController::class, "manageStaffs"]);
    Route::get('/manage-staffs/{staff_id}/details', [StaffController::class, "staffInfo"]);
    Route::get('/manage-staffs/{staff_id}/edit', [StaffController::class, "staffEditInfo"]);
    Route::post('/manage-staffs/{staff_id}/update', [StaffController::class, "staffUpdateInfo"]);
    Route::get('/manage-staffs/delete/{staff_id}', [StaffController::class, "deleteStaff"]);
    Route::get('/manage-staffs/add-new-staff', [StaffController::class, "addNewStaff"]);
    Route::post('/manage-staffs/new-staff', [StaffController::class, "updateNewStaff"]);

    //Customer
    Route::get('/customers',[CustomerController::class,"customers"]);
    Route::get('/create-customer',[CustomerController::class,"create_customer"]);
    Route::post('/save-customer',[CustomerController::class,"save_customer"]);
    Route::get('/customer-details/{customer_id}',[CustomerController::class,"customer_details"]);
    // Appointment
    Route::get('/appointments/{customer_id}',[AppointmentController::class,"appointments"]);
    Route::get('/create-appointment',[AppointmentController::class,"create_appointment"]);
    Route::post('/save-appointment',[AppointmentController::class,"save_appointment"]);
    Route::get('/appointment-details/{appointment_id}',[AppointmentController::class,"appointment_details"]);

});



Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

