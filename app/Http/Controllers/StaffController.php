<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;

class StaffController extends Controller
{
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
}
