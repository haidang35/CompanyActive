<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;


class NotificationController extends Controller
{
    public function manage_noti(){
        $user = Auth::user();
        $user->unreadNotifications->markAsRead();
        return view("admin.notification.notification_list", compact("user"));

    }
    public function remove_noti(){
        try{
            $user = Auth::user();
            $user->unreadNotifications->delete();
            return redirect()->to("/admin/manage-noti");
        }catch (Exception $e){
            abort(404);
        }
    }


}
