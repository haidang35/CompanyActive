<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\DepartmentCollection;
use App\Models\Department;
use App\Models\Staff;
use App\Http\Resources\StaffResource;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/departments', function () {
//    $departments = Department::all();
//    return DepartmentCollection::collection($departments);
    return new DepartmentCollection(Department::all());
});

Route::get('/departments/{department_id}', function($department_id) {
    $department = Department::findOrFail($department_id);
    return $department;
});

// API Staff

Route::get("/staffs", function () {
    $staffs = Staff::all();
    return StaffResource::collection($staffs);
});

Route::get("/staffs/{staff_id}", function ($staff_id) {
    try {
        $staff = Staff::findOrFail($staff_id);
        return $staff;
    }catch (Exception $exception) {
        return "Staff not found";
    }
});

Route::delete("/staffs/{staff_id}", function ($staff_id) {
    $staff = Staff::findOrFail($staff_id);
    $staff->delete();
    return "Delete staff successful!!";
});

Route::put("/staffs/{staff_id}", function($staff_id, Request $request) {
    try {
        $staff = Staff::findOrFail($staff_id);
        $staff->update([
            "staff_name" => $request->staff_name,
            "staff_birthday" => $request->staff_birthday,
            "staff_email" => $request->staff_email,
            "staff_phone" => $request->staff_phone,
            "staff_address" => $request->staff_address
        ]);
        return $staff;
    }catch (Exception $exception) {
        return "Update staff failed";
    }

});


