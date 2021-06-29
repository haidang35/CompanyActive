<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class AdminController extends Controller
{
    public function adminDashboard() {
        return view("admin.admin_dashboard");

    }

    public function adminLogout() {
        $user = Auth::user();
        Auth::login($user, false);
        return Redirect::to("/login");
    }





    public function staffUpdateInfo($staff_id, Request $request) {
        try {
            $data = array();
            $data["staff_name"] = $request->get("staff_name");
            $data["staff_birthday"] = $request->get("staff_birthday");
            $data["staff_email"] = $request->get("staff_email");
            $data["staff_phone"] = $request->get("staff_phone");
            $data["staff_address"] = $request->get("staff_address");
            $staff = Staff::findOrFail($staff_id);
            $staff->update($data);
            Session::put("message_success", "Update information staff success !!");
            return Redirect::to("admin/manage-staffs/".$staff_id."/details");
        }catch (\Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function deleteStaff($staff_id) {
        try {
           Staff::findOrFail($staff_id)->delete();
           Session::put("message_success", "Delete staff success !!");
           return Redirect::to("/admin/manage-staffs");
        }catch (\Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function addNewStaff() {
        $departments = Department::all();
       return view("admin.staff.add_new_staff", [
           "departments" => $departments
       ]);
    }

    public function updateNewStaff(Request $request) {
        try {
            $data = array();
            $data["staff_name"] = $request->get("staff_name");
            $data["staff_birthday"] = $request->get("staff_birthday");
            $data["staff_email"] = $request->get("staff_email");
            $data["staff_phone"] = $request->get("staff_phone");
            $data["staff_address"] = $request->get("staff_address");
            $data["department_id"] = $request->get("department_id");
            Staff::create($data);
            Session::put("message_success", "Add new staff success !!");
            return Redirect::to("admin/manage-staffs");
        }catch (\Exception $exception) {
            dd($exception->getMessage());
        }

    }





}
