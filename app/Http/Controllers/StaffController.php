<?php

namespace App\Http\Controllers;

use App\Events\CountNotify;
use App\Events\Notify;
use App\Models\Department;
use App\Models\Staff;
use Exception;
use Illuminate\Auth\Authenticatable;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use App\Notifications\Message;
use App\Models\User;

class StaffController extends Controller
{

    public function manageStaffs(Request $request) {
        $search_value = $request->get("search_value");
        $department_id = $request->get("department_id");
        $staffs = Staff::with("Department")->search($search_value)->department($department_id)->paginate(20);
        $departments = Department::all();

        return view("admin.staff.staffs_list", [
            "staffs" => $staffs,
            "data_scope" => $departments
        ]);
    }

    public function staffInfo($staff_id) {
        try {
            $staff = Staff::findOrFail($staff_id);
            return view("admin.staff.staff_details", [
                "staff" => $staff,
                "edit" => false
            ]);
        }catch (Exception $exception) {
            dd($exception->getMessage());
        }

    }

    public function staffEditInfo($staff_id) {
        try {
            $staff = Staff::findOrFail($staff_id);
            return view("admin.staff.staff_details", [
                "staff" => $staff,
                "edit" => true
            ]);
        }catch (Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function staffUpdateInfo($staff_id, Request $request) {
        $request->validate([
            "staff_name" => "required",
            "staff_birthday" => "required",
            "staff_email" => "required",
            "staff_phone" => "required",
            "staff_address" => "required",
        ]);
        try {
            $user = Auth::user();
            $users = User::all()->whereNotIn('id',$user->id);
            $data = array();
            $data["staff_name"] = $request->get("staff_name");
            $data["staff_birthday"] = $request->get("staff_birthday");
            $data["staff_email"] = $request->get("staff_email");
            $data["staff_phone"] = $request->get("staff_phone");
            $data["staff_address"] = $request->get("staff_address");
            $staff = Staff::findOrFail($staff_id);
            $staff->update($data);
            $offerData = [
                'name' => 'Notification from Company Active',
                'body' => $user->name. " has just update staff ".  $staff->staff_name,
                'url' => url('/'),
                'thanks' => "Thanks for using our service ",
                'to' => $user->email,
            ];
            \event(new Notify($offerData));
            Notification::send($users, new Message($offerData));
            Session::put("message_success", "Update information staff success !!");
            return Redirect::to("admin/manage-staffs/".$staff_id."/details");
        }catch (Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function deleteStaff($staff_id) {

        try {
            $user = Auth::user();
            $users = User::all()->whereNotIn('id',$user->id);
            $staff = Staff::findOrFail($staff_id);
            $staff->delete();
            Session::put("staff_deleted", $staff);
            Session::put("message_success", "Delete staff success !!");
            $offerData = [
                'name' => 'Notification from Company Active',
                'body' => $user->name. " has just deleted staff ".  $staff->staff_name,
                'url' => url('/'),
                'thanks' => "Thanks for using our service ",
                'to' => $user->email,
            ];
            \event(new Notify($offerData));
            Notification::send($users, new Message($offerData));
            return Redirect::to("/admin/manage-staffs");
//            return (new Message($offerData))->toMail($offerData);
        }catch (Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function restoreStaff($staff_id) {
        try {
            $staff_deleted = Staff::withTrashed()->find($staff_id);
            $staff_deleted->restore();
            Session::put("message_success", "Restore staff ".$staff_deleted->staff_name." success !!");
            return Redirect::to("admin/manage-staffs");
        }catch (Exception $exception) {
            abort(404);
        }
    }

    public function addNewStaff() {
        $departments = Department::all();
        return view("admin.staff.add_new_staff", [
            "departments" => $departments
        ]);
    }

    public function updateNewStaff(Request $request) {
        $request->validate([
            "staff_name" => "required",
            "staff_birthday" => "required",
            "staff_email" => "required",
            "staff_phone" => "required",
            "staff_address" => "required",
        ]);
        try {
            $user = Auth::user();
            $users = User::all()->whereNotIn('id',$user->id);
            $data = array();
            $data["staff_name"] = $request->get("staff_name");
            $data["staff_birthday"] = $request->get("staff_birthday");
            $data["staff_email"] = $request->get("staff_email");
            $data["staff_phone"] = $request->get("staff_phone");
            $data["staff_address"] = $request->get("staff_address");
            $data["department_id"] = $request->get("department_id");
            Staff::create($data);
            $offerData = [
                'name' => 'Notification from Company Active',
                'body' => $user->name. " has just add new staff ".  $data->staff_name,
                'url' => url('/'),
                'thanks' => "Thanks for using our service ",
                'to' => $user->email,
            ];
            \event(new Notify($offerData));
            Notification::send($users, new Message($offerData));
            Session::put("message_success", "Add new staff success !!");
            return Redirect::to("admin/manage-staffs");
        }catch (Exception $exception) {
            dd($exception->getMessage());
        }

    }
}
