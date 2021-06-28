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
}
