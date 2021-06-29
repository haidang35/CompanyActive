<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class AdminController extends Controller
{
    public function admin_dashboard() {
        return view("admin.admin_dashboard");

    }

    public function manage_departments() {
        $departments = Department::withCount("Staff")->paginate(20);
        return view("admin.department.departments", [
            "departments" => $departments
        ]);
    }

    public function department_details($department_id) {
        $department = Department::withCount("Staff")->where("department_id", $department_id)->first();
        $staffs = Staff::with("Department")->where("department_id",$department_id )->paginate(10);
        return view("admin.department.department_details", [
            "department" => $department,
            "staffs" => $staffs,
            "edit" => false
        ]);
    }

    public function department_edit($department_id) {
        $department = Department::withCount("Staff")->where("department_id", $department_id)->first();
        $staffs = Staff::with("Department")->where("department_id",$department_id )->paginate(10);
        return view("admin.department.department_details", [
            "department" => $department,
            "staffs" => $staffs,
            "edit" => true
        ]);
    }

    public function department_update(Request $request, $department_id) {
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

    public function department_remove_member($staff_id) {
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

    public function department_add_member($department_id) {
        $staffs = Staff::all()->where("department_id", "=", "");
        return view("admin.department.staffs_list", [
            "staffs" => $staffs,
            "department_id" => $department_id
        ]);
    }

    public function department_update_member($department_id, $staff_id) {
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


}
