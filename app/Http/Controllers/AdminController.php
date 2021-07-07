<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Mr_Cong;
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












}
