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
    $department = Department::with("Staff")->findOrFail($department_id);
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



























// API Appointment
Route::get("/appointments",function (){
    $appointments = \App\Models\Appointment::all();
    return \App\Http\Resources\AppoinmentResource::collection($appointments);
});
Route::get("/appointments/{appointment_id}",function ($appointment_id){
    try{
        $appointment = \App\Models\Appointment::findOrFail($appointment_id);
        return $appointment;
    }catch (Exception $e){
        return "Appointment not found";
    }
});
Route::delete("/appointments/{appointment_id}",function ($appointment_id){
    try{
        $appointment = \App\Models\Appointment::findOrFail($appointment_id);
        $appointment->delete();
        return $appointment;
    }catch (Exception $e){
        return "Delete appointment successfully";
    }
});
Route::put("/appointments/{appointment_id}",function ($appointment_id,Request $request){
    try{
        $appointment = \App\Models\Appointment::findOrFail($appointment_id);
        $appointment->update([
            "appointment_staff"=>$request->appointment_staff,
            "appointment_purpose"=>$request->appointment_purpose,
            "appointment_project"=>$request->appointment_project,
            "appointment_status"=>$request->appointment_status,
            "customer_id"=>$request->customer_id,
        ]);
    }catch (Exception $e){
        return "Edit appointment failed";
    }
});

// API Customer
Route::get("customers",function (){
    $customers = \App\Models\Customer::all();
    return \App\Http\Resources\CustomerResource::collection($customers);
});
Route::get("/customers/{customer_id}",function ($customer_id){
    try{
        $customer = \App\Models\Customer::findOrFail($customer_id);
        return $customer;
    }catch (Exception $e){
        return "Customer not found";
    }
});
Route::delete("/customers/{customer_id}",function ($customer_id){
    try{
        $customer = \App\Models\Customer::findOrFail($customer_id);
        $customer->delete();
        return $customer;
    }catch (Exception $e){
        return "Delete customer successfully";
    }
});
Route::put("/customers/{customer_id}",function ($customer_id,Request $request){
    try {
        $customer = \App\Models\Customer::findOrFail($customer_id);
        $customer->update([
            "customer_id"=>$request->customer_id,
            "customer_name"=>$request->customer_name,
            "customer_phone"=>$request->customer_phone,
            "customer_address"=>$request->customer_address,
            "customer_relationship"=>$request->customer_relationship,
        ]);
    }catch (Exception $e){
        return "Edit customer failed";
    }
});


