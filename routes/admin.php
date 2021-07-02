<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\PostController;

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

    //Document
    Route::get("/documents", [DocumentController::class, "manageDocuments"]);
    Route::post("/documents/upload", [DocumentController::class, "uploadDocument"]);
    Route::get("/documents/view/{document_id}", [DocumentController::class, "viewDocument"]);

    //Post
    Route::get("/manage-posts", [PostController::class, "managePosts"]);
    Route::get("/posts/editor", [PostController::class, "postEditor"]);
    Route::get("/manage-posts/{post_id}/details", [PostController::class, "postDetails"]);
    Route::get("/manage-posts/{post_id}/publish", [PostController::class, "publishPost"]);
    Route::get("/manage-posts/{post_id}/edit", [PostController::class, "editPost"]);
    Route::post("/manage-posts/{post_id}/update", [PostController::class, "updatePost"]);
    Route::get("/manage-posts/{post_id}/delete", [PostController::class, "deletePost"]);
    Route::get("/manage-posts/{post_id}/restore", [PostController::class, "restorePost"]);
    Route::post("/posts/save-post", [PostController::class, "savePost"])->name('ckeditor.image-upload');




    // -------------------LINH-----------------------///

    //Customer
    Route::get('/customers',[App\Http\Controllers\CustomerController::class,"customers"]);
    Route::get('/customers/create-customer',[App\Http\Controllers\CustomerController::class,"create_customer"]);
    Route::post('/customers/save-customer',[App\Http\Controllers\CustomerController::class,"save_customer"]);
    Route::get('/customers/customer-details/{customer_id}',[App\Http\Controllers\CustomerController::class,"customer_details"]);
    Route::get('/customers/delete-customer/{customer_id}',[App\Http\Controllers\CustomerController::class,"delete_customer"]);

    // Appointment
    Route::get('/appointments/{customer_id}',[App\Http\Controllers\AppointmentController::class,"appointments"]);
    Route::get('/appointments/create-appointment',[App\Http\Controllers\AppointmentController::class,"create_appointment"]);
    Route::post('/appointments/save-appointment',[App\Http\Controllers\AppointmentController::class,"save_appointment"]);
    Route::get('/appointments/appointment-details/{appointment_id}',[App\Http\Controllers\AppointmentController::class,"appointment_details"]);
    Route::get('/appointments/delete-appointment/{appointment_id}',[App\Http\Controllers\AppointmentController::class,"delete_appointment"]);
});



Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

