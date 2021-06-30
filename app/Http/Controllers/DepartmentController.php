<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use MongoDB\Driver\Exception\ExecutionTimeoutException;

class DepartmentController extends Controller
{
    public function manageDepartments(Request $request) {
        $search_value = $request->get("department_search");
        $select_code = $request->get("select_code");
        $select_pic = $request->get("select_pic");
        $departments = Department::withCount("Staff")->search($search_value)->code($select_code)->pic($select_pic)->paginate(20);
        $data_scope = Department::all();
        return view("admin.department.departments", [
            "departments" => $departments,
            "data_scope" => $data_scope
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
        Session::put("message_success", "Update information department success !!");
        return Redirect::to("/admin/department-details/".$department_id);

    }

    public function departmentRemoveMember($staff_id) {
        try {
            $staff = Staff::findOrFail($staff_id);
            $department_id = $staff->department_id;
            $staff->update([
                "department_id" => null
            ]);
            Session::put("message_success", "Remove member from department success ");
            Session::push("staffs_removed", $staff);
            Session::put("staff_removed", $staff);
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
            Session::put("message_success", "Add new member to department success !!");
            return Redirect::to("/admin/department-details/".$department_id);
        }catch (\Exception $e) {
            abort(404);
        }

    }

    public function addNewDepartment() {
        $pics = Staff::all();
        return view("admin.department.add_new_department", [
            "pics" => $pics
        ]);
    }

    public function saveNewDepartment(Request $request) {
        $request->validate([
           "department_name" => "required",
           "department_code" => "required",
        ], [
            "department_name.required" => "Department Name does not empty",
            "department_code.required" => "Department Code does not empty",
        ]);

        $data = array();
        $data["department_name"] = $request->get("department_name");
        $data["department_code"] = $request->get("department_code");
        $data["department_pic"] = $request->get("department_pic");
        $data["department_desc"] = $request->get("department_desc");
        try {
            Department::create($data);
            Session::put("message_success", "Add new department success !!");
            return Redirect::to("admin/manage-departments");
        }catch (\Exception $exception) {
            dd($exception->getMessage());
        }

    }

    public function deleteDepartment($department_id) {
        try {
            $department = Department::findOrFail($department_id);
            if($department->staff_count == 0) {
                $department->delete();
                Session::put("message_success", "Delete department ".$department->department_name. " success !!");
                Session::put("department_delete", $department);
                return Redirect::to("admin/manage-departments");
            }
        }catch (\Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function restoreDepartment($department_id) {
        try {
            $department = Department::withTrashed()->find($department_id);
            $department->restore();
            Session::put("message_success", "Restore department ".$department->department_name." success !!");
            return Redirect::to("admin/manage-departments");

        }catch (\Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function removeAllMember($department_id) {
        try {
            $staffs = Staff::where("department_id", $department_id)->get();
            Session::put("staffs_removed", $staffs);
            foreach ($staffs as $item) {
                $item->update([
                    "department_id" => null
                ]);
            }
            Session::put("message_success", "Remove all member success !!");
            return Redirect::to("admin/department-details/".$department_id);
        }catch (\Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function restoreAllMember($department_id) {
        try {
            $staffs = Session::get("staffs_removed");
            foreach ($staffs as $item) {
                $staff = Staff::findOrFail($item->staff_id);
                $staff->update([
                    "department_id" => $department_id
                ]);
            }
            Session::put("message_success", "Restore all members success !!");
            return Redirect::to("admin/department-details/".$department_id);
        }catch (\Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function restoreMember($department_id, $staff_id) {
        try {
            $staff = Staff::findOrFail($staff_id);
            $staff->update([
                "department_id" => $department_id
            ]);
            Session::put("message_success", "Restore staff ".$staff->staff_name." success !!");
            return Redirect::to("admin/department-details/".$department_id);
        }catch (\Exception $exception) {
            dd($exception->getMessage());
        }
    }
}
