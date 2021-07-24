<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\DepartmentCollection;
use App\Models\Department;
use App\Models\Staff;
use App\Http\Resources\StaffResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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

//User
Route::get('/users', function () {
    try {
        $users = User::all();
        return $users;
    } catch (\Exception $exception) {
        return $exception;
    }
});

Route::get('users/{userId}', function ($userId) {
    try {
        $user = User::findOrFail($userId);
        return $user;
    } catch (\Exception $exception) {
        return $exception;
    }
});

Route::patch('users/{userId}', function ($userId, Request $request) {
    try {
        $user = User::findOrFail($userId);
        $user->update([
            "name" => $request->name,
            "birthday" => $request->birthday,
            "email" => $request->email,
            "phone" => $request->phone,
            "address" => $request->address,
        ]);
        return $user;
    } catch (\Exception $exception) {
        return "Update failed";
    }
});

Route::delete('users/{userId}', function ($userId) {
    try {
        $user = User::findOrFail($userId);
        $user->delete();
        return $user;
    } catch (\Exception $exception) {
        return "Delete user failed!";
    }
});

//Department

Route::get('/departments', function () {
    //    $departments = Department::all();
    //    return DepartmentCollection::collection($departments);
    return new DepartmentCollection(Department::with("Staff")->get());
});

Route::get('/departments/{department_id}', function ($department_id) {
    $department = Department::with("Staff")->findOrFail($department_id);
    return $department;
});

Route::delete('/departments/{department_id}', function ($department_id) {
    $department = Department::findOrFail($department_id);
    $department->delete();
    return $department;
});

Route::post('/departments', function (Request $request) {
    try {
        $department = Department::create([
            "department_name" => $request->get("department_name"),
            "department_code" => $request->get("department_code"),
            "department_pic" => $request->get("department_pic"),
            "department_desc" => $request->get("department_desc")
        ]);
        return $department;
    } catch (\Exception $exception) {
        return $exception;
    }
});

//Remove member from department
Route::patch('departments/{departmentId}/{staffId}', function ($departmentId, $staffId) {
    try {
        $staff = User::findOrFail($staffId);
        if ($staff->department_id === $departmentId) {
            $staff->update([
                "department_id" => null
            ]);
            return $staff;
        }
    } catch (\Exception $exception) {
        return $exception;
    }
});

//list staff hasn't department

Route::get('staffs/pending', function () {
    try{
        $staffs = User::where("department_id", null)->get();
        return $staffs;
    }catch(\Exception $exception) {
        return $exception;
    }
});

//Add member to department
Route::put('departments/{departmentId}/add-member', function ($departmentId, Request $request) {
    $staffId = $request->id;
    $staff = User::findOrFail($staffId);
    $staff->update([
         "department_id" => $departmentId
    ]);
    return $staff;
    
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
    } catch (Exception $exception) {
        return "Staff not found";
    }
});

Route::delete("/staffs/{staff_id}", function ($staff_id) {
    $staff = Staff::findOrFail($staff_id);
    $staff->delete();
    return "Delete staff successful!!";
});

Route::put("/staffs/{staff_id}", function ($staff_id, Request $request) {
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
    } catch (Exception $exception) {
        return "Update staff failed";
    }
});

//Login
Route::post('/login', function (Request $request) {
    try {
        $username = $request->get("username");
        $password = $request->get("password");
        $user = User::where("email", $username)->first();
        if ($user &&  Hash::check($password, $user->password) == true) {
            return $user;
        } else {
            $userStaff = Staff::where("staff_email", $username)->first();
            if ($userStaff->password == $password) return $userStaff;
        }
    } catch (Exception $exception) {
        return "Login failed";
    }
});

Route::post('register', function (Request $request) {
    try {
        $name = $request->get("name");
        $username = $request->get("username");
        $password = Hash::make($request->get("password"));
        $user = User::create([
            "name" => $name,
            "email" => $username,
            "password" => $password
        ]);
        return $user;
    } catch (Exception $exception) {
        return "Register failed";
    }
});
