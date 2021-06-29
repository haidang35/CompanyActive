<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class AdminController extends Controller
{
    public function adminDashboard() {
        return view("admin.admin_dashboard");

    }

    public function manageDepartments() {
        $departments = Department::withCount("Staff")->paginate(20);
        return view("admin.department.departments", [
            "departments" => $departments
        ]);
    }

    public function departmentDetails($department_id) {
        $department = Department::withCount("Staff")->where("department_id", $department_id)->first();
        $staffs = Staff::with("Department")->where("department_id",$department_id )->paginate(10);
        return view("admin.department.department_details", [
            "department" => $department,
            "staffs" => $staffs,
            "edit" => false
        ]);
    }

    public function departmentEdit($department_id) {
        $department = Department::withCount("Staff")->where("department_id", $department_id)->first();
        $staffs = Staff::with("Department")->where("department_id",$department_id )->paginate(10);
        return view("admin.department.department_details", [
            "department" => $department,
            "staffs" => $staffs,
            "edit" => true
        ]);
    }

    public function departmentUpdate(Request $request, $department_id) {
        $data = array();
        $data["department_name"] = $request->get("department_name");
        $data["department_code"] = $request->get("department_code");
        $data["department_pic"] = $request->get("department_pic");
        $data["department_desc"] = $request->get("department_desc");
        $get_department = Department::findOrFail($department_id);
        $get_department->update($data);
        Session::put("message", "Update information department success !!");
        return Redirect::to("/admin/department-details/".$department_id);

    }

    public function departmentRemoveMmember($staff_id) {
        try {
            $staff = Staff::findOrFail($staff_id);
            $department_id = $staff->department_id;
            $staff->update([
                "department_id" => null
            ]);
            Session::put("message", "Remove member from department success ");
            return Redirect::to("/admin/department-details/".$department_id);

        }catch (\Exception $e) {
            abort(404);
        }
    }

    public function departmentAddMember($department_id) {
        $staffs = Staff::all()->where("department_id", "=", "");
        return view("admin.department.staffs_list", [
            "staffs" => $staffs,
            "department_id" => $department_id
        ]);
    }

    public function departmentUpdateMember($department_id, $staff_id) {
        try {
            $staff = Staff::findOrFail($staff_id);
            $staff->update([
                "department_id" => $department_id
            ]);
            Session::put("message", "Add new member to department success !!");
            return Redirect::to("/admin/department-details/".$department_id);
        }catch (\Exception $e) {
            abort(404);
        }

    }

    public function manageStaffs() {
        $staffs = Staff::with("Department")->paginate(20);
        return view("admin.staff.staffs_list", [
            "staffs" => $staffs
        ]);
    }

    public function staffInfo($staff_id) {
        try {
            $staff = Staff::findOrFail($staff_id);
            return view("admin.staff.staff_details", [
                "staff" => $staff,
                "edit" => false
            ]);
        }catch (\Exception $exception) {
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
        }catch (\Exception $exception) {
            dd($exception->getMessage());
        }
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
