<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Notification;


class NotificationController extends Controller
{
    public function manage_noti(){
        return view("admin.notification.notification_list");

    }

}
