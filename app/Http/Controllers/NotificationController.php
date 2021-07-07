<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Notification;


class NotificationController extends Controller
{
    public function manage_noti(){
        $user = User::find(1);
        $user->unreadNotifications->markAsRead();
        return view("admin.notification.notification_list", compact("user"));

    }
    public function remove_noti(){
        try{
            $notification = Notification::all();
            $notification->delete();
            return redirect()->to("/admin/manage-noti");
        }catch (\Exception $e){
            abort(404);
        }
    }
}
