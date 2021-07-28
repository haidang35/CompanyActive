<?php

use App\Events\Notify;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\DepartmentCollection;
use App\Models\Department;
use App\Models\Staff;
use App\Models\Customer;
use App\Models\Appointment;
use App\Http\Resources\StaffResource;
use App\Models\Mission;
use App\Models\Notification as ModelsNotification;
use App\Models\User;
use App\Notifications\Message;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\Paginator as PaginationPaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;

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
    $users = User::with("Department")->paginate(20);
    return $users;
});

Route::get('users/all', function () {
    $users = User::all();
    return $users;
});

Route::post('users/page', function (Request $request) {
    $page = $request->page;
    $search = $request->search_value;
    $scopeDepartment = $request->department;
    $users = User::with("Department")->search($search)->department($scopeDepartment)->paginate(20, ['*'], 'page', $page);
    return $users;
});

Route::post('users/search', function (Request $request) {
    $search = $request->search_value;
    $scopeDepartment = $request->department;
    $users = User::with("Department")->search($search)->department($scopeDepartment)->paginate(20);
    return $users;
});

Route::get('users/{userId}', function ($userId) {
    try {
        $user = User::with("Department")->findOrFail($userId);
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

Route::post('users', function (Request $request) {
    $user = User::create([
        "name" => $request->name,
        "birthday" => $request->birthday,
        "email" => $request->email,
        "phone" => $request->phone,
        "address" => $request->address,
        "password" => Hash::make($request->password),
        "department_id" => $request->department_id
    ]);
    return $user;
});

//Department

Route::get('/departments', function (Request $request) {
    $search = $request->search_value;
    $departments = Department::with("Staff")->with("Manager")->search($search)->paginate(20);
    //    return DepartmentCollection::collection($departments);
    // return new DepartmentCollection(Department::with("Staff")->search($search)->get());
    return $departments;
});

Route::patch('departments/{departmentId}', function ($departmentId, Request $request) {
    $department = Department::find($departmentId);
    $department->update([
        "department_name" => $request->department_name,
        "department_code" => $request->department_code,
        "department_pic" => $request->department_pic,
        "department_desc" => $request->department_desc
    ]);
    return $department;
});

Route::get('/departments/pics', function () {
    $departments = Department::with("Manager")->get();
    $pics = [];
    foreach ($departments as $item) {
        $pic = User::find($item->department_pic);
        if ($pic) $pics[] = $pic;
    }
    return $pics;
});

Route::post('departments/page', function (Request $request) {
    $page = $request->page;
    $search = $request->search_value;
    $pic = $request->pic;
    $departments = Department::with("Staff")->with("Manager")->search($search)->pic($pic)->paginate(20, ['*'], 'page', $page);
    return $departments;
});

Route::post('departments/search', function (Request $request) {
    $search = $request->search_value;
    $pic = $request->pic;
    $departments = Department::with("Staff")->with("Manager")->search($search)->pic($pic)->paginate(20);
    return $departments;
});

Route::get('/departments/{department_id}', function ($department_id) {
    $department = Department::with("Staff")->with("Manager")->findOrFail($department_id);
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
    try {
        $staffs = User::where("department_id", null)->get();
        return $staffs;
    } catch (\Exception $exception) {
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
    $username = $request->get("username");
    $password = $request->get("password");
    $user = User::where("email", $username)->first();
    if ($user &&  Hash::check($password, $user->password) == true) {
        return $user;
    } else {
        $userStaff = Staff::where("staff_email", $username)->first();
        if ($userStaff->password == $password) return $userStaff;
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


// Customer
Route::get('customers', function () {
    $customers = Customer::with("Appointment")->paginate(20);
    return $customers;
});

Route::get('customers/all', function () {
    $customers = Customer::all();
    return $customers;
});

Route::post('customers/search', function (Request $request) {
    $search = $request->search_value;
    $customers = Customer::with("Appointment")->search($search)->paginate(20);
    return $customers;
});

Route::post('customers/page', function (Request $request) {
    $page = $request->page;
    $search = $request->search_value;
    $customers = Customer::with("Appointment")->search($search)->paginate(20, ['*'], 'page', $page);
    return $customers;
});

Route::post('customers', function (Request $request) {
    $customer = Customer::create([
        "customer_name" => $request->customer_name,
        "customer_email" => $request->customer_email,
        "customer_phone" => $request->customer_phone,
        "customer_address" => $request->customer_address
    ]);
    return $customer;
});

Route::get('customers/{customerId}', function ($customerId) {
    $customer = Customer::with("Appointment")->findOrFail($customerId);
    return $customer;
});

Route::patch('customers/{customerId}', function ($customerId, Request $request) {
    $customer = Customer::findOrFail($customerId);
    $customer->update([
        "customer_name" => $request->customer_name,
        "customer_email" => $request->customer_email,
        "customer_phone" => $request->customer_phone,
        "customer_address" => $request->customer_address
    ]);
    return $customer;
});

//Appointment
Route::get('appointments', function () {
    $appointments = Appointment::with("Customer")->paginate(20);
    return $appointments;
});

Route::post('appointments/page', function (Request $request) {
    $page = $request->page;
    $search_value = $request->search_value;
    $status = $request->status;
    $appointments = Appointment::with("Customer")->search($search_value)->status($status)->paginate(20, ['*'], 'page', $page);
    return $appointments;
});

Route::post('appointments/search', function (Request $request) {
    $search_value = $request->search_value;
    $status = $request->status;
    $appointments = Appointment::with("Customer")->search($search_value)->status($status)->paginate(20);
    return $appointments;
});

Route::get('appointments/{appointmentId}', function ($appointmentId) {
    $appointment = Appointment::with("Customer")->with("Staff")->findOrFail($appointmentId);
    return $appointment;
});

Route::post('appointments', function (Request $request) {
    $appointment = Appointment::create([
        "appointment_title" => $request->appointment_title,
        "appointment_time" => $request->appointment_time,
        "appointment_desc" => $request->appointment_desc,
        "appointment_status" => $request->appointment_status,
        "customer_id" => $request->customer_id,
        "staff_id" => $request->staff_id
    ]);
    $customer = Customer::find($request->customer_id);
    $staff = User::findOrFail($request->staff_id);
    $body = 'You just got a new appointment with a customer ' . $customer->customer_name;
    $message = [
        'title' => 'Notification from Company Active',
        'body' => $body,
        'url' => url('/app/appointments/' . $appointment->id),
        'thanks' => "Thanks for reading ",
        'to' => $staff->email
    ];
    Notification::send($staff, new Message($message));
    return $appointment;
});

Route::patch('appointments/{appointmentId}', function ($appointmentId, Request $request) {
    $appointment = Appointment::findOrFail($appointmentId);
    $appointment->update([
        "appointment_title" => $request->appointment_title,
        "appointment_time" => $request->appointment_time,
        "appointment_desc" => $request->appointment_desc,
        "appointment_status" => $request->appointment_status
    ]);
    return $appointment;
});

Route::get("appointments/staff/{staffId}", function ($staffId) {
    $appointments = Appointment::with("Customer")->where("staff_id", $staffId)->get();
    return $appointments;
});

//Mission
Route::get('missions', function () {
    $missions = Mission::paginate(20);
    return $missions;
});

Route::get('missions/staffs/{staffId}', function ($staffId) {
    $missions = Mission::where("staff_id", $staffId)->paginate(20);
    return $missions;
});

Route::post('missions/search', function (Request $request) {
    $search = $request->search_value;
    $status = $request->status;
    $timeId = $request->date_time;
    $datePicker = $request->date_picker;
    $missions = Mission::search($search)->status($status)->date($datePicker)->time($timeId)->paginate(20);
    return $missions;
});

Route::get('missions/{missionId}', function ($missionId) {
    $mission = Mission::with('Pic')->with('Staff')->findOrFail($missionId);
    return $mission;
});

//Change current page 
Route::post('missions', function (Request $request) {
    $page = $request->get("page");
    $search_value = $request->search_value;
    $status = $request->status;
    $timeId = $request->date_time;
    $datePicker = $request->date_picker;
    $missions = Mission::search($search_value)->status($status)->date($datePicker)->time($timeId)->paginate(20, ['*'], 'page', $page);
    return $missions;
});

Route::patch("missions/{missionId}/update", function ($missionId, Request $request) {
    $mission = Mission::find($missionId);
    $mission->update([
        "mission_title" => $request->mission_title,
        "mission_content" => $request->mission_content,
        "mission_deadline" => $request->mission_deadline,
        "mission_note" => $request->mission_note,
    ]);
    return $mission;
});

Route::patch('missions/{missionId}', function (Request $request, $missionId) {
    $mission = Mission::findOrFail($missionId);
    $mission->update([
        "mission_status" => $request->mission_status,
    ]);
    return $mission;
});

Route::put('missions/{missionId}', function ($missionId, Request $request) {
    $mission = Mission::findOrFail($missionId);
    $mission->update([
        "progress" => $request->progress
    ]);
    return $mission;
});

Route::post('missions/new', function (Request $request) {
    $mission = Mission::create([
        "mission_title" => $request->mission_title,
        "mission_content" => $request->mission_content,
        "mission_deadline" => $request->mission_deadline,
        "mission_note" => $request->mission_note,
        "pic_id" => $request->pic_id,
        "staff_id" => $request->staff_id
    ]);
    $pic = User::findOrFail($request->pic_id);
    $staff = User::findOrFail($request->staff_id);
    $message = [
        'title' => 'Notification from Company Active',
        'body' => $pic->name . ' add new mission for you',
        'url' => url('/app/missions/' . $mission->id),
        'thanks' => "Thanks for reading ",
        'to' => $staff->email,
        'staff_id' => $staff->id,
        'created_at' => Carbon::now()
    ];
    event(new Notify($message));
    Notification::send($staff, new Message($message));
    return $mission;
});


//Notifications

Route::get('notifications/{userId}', function ($userId) {
    $user = User::findOrFail($userId);
    $notification = $user->notifications;
    return $notification;
});
