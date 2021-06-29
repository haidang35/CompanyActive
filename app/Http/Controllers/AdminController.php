<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function admin_dashboard() {
        return view("admin.admin_dashboard");
    }
    public function manage_departments() {
        $departments = Department::all();
        return view("admin.departments", [
            "departments" => $departments
        ]);
    }
    public function form_create_department(){
        return view("admin.create_department");
    }
    public function save_department(Request $request){
        $request->validate([
            "department_name"=>"required",
            "department_code"=>"required",
            "department_pic"=>"required",
            "department_members"=>"required",
        ],[
            "department_name.required"=>"Vui long nhap ten bo phan",
            "department_code.required"=>"Vui long nhap ma bo phan",
            "department_pic.required"=>"Vui long nhap ten nguoi chiu trach nhiem",
            "department_members.required"=>"Vui long nhap so luong thanh vien cua bo phan",
        ]);
        try{
            Department::create([
                "department_name"=>$request->get("department_name"),
                "department_code"=>$request->get("department_code"),
                "department_pic"=>$request->get("department_pic"),
                "department_desc"=>$request->get("department_desc"),
                "department_members"=>$request->get("department_members")
            ]);
            return redirect()->to("/manage-departments");
        }catch (\Exception $e){
            abort(404);
        }
    }
    public function edit_department($department_id){
        $department = Department::findOrFail($department_id);
        return view("admin.edit_department",[
            "department"=>$department
            ]);
    }
    public function update_department(Request $request,$department_id){
        $department = Department::findOrFail($department_id);
        $request->validate([
            "department_name"=>"required",
            "department_code"=>"required",
            "department_pic"=>"required",
            "department_members"=>"required",
        ],[
            "department_name.required"=>"Vui long nhap ten bo phan",
            "department_code.required"=>"Vui long nhap ma bo phan",
            "department_pic.required"=>"Vui long nhap ten nguoi chiu trach nhiem",
            "department_members.required"=>"Vui long nhap so luong thanh vien cua bo phan",
        ]);
        try{
            $department->update([
                "department_name"=>$request->get("department_name"),
                "department_code"=>$request->get("department_code"),
                "department_pic"=>$request->get("department_pic"),
                "department_desc"=>$request->get("department_desc"),
                "department_members"=>$request->get("department_members")
            ]);
            return redirect()->to("/manage-departments");
        }catch (\Exception $e){
            abort(404);
        }
    }


}
