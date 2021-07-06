<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Customer;
use App\Models\Notification;
use App\Notifications\Message;
use App\Notifications\ReplyToActive;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
//use \App\Http\Controllers\Thread;

class AppointmentController extends Controller
{
    public function appointments()
    {
        $appointments = Appointment::with("Customer")->get();
        $customers = Customer::with("Appointment")->get();
        return view("admin.customer.customer_information.appointment_list", [
            "appointments"=>$appointments,
            "customers"=>$customers
        ]);
    }
    public function form_appointment(){
        $appointments = Appointment::with("Customer")->get();
        $customers = Customer::with("Appointment")->get();
        Session::put("message_success","Add appointment successfully");
        return view("admin.customer.appointment.form_appointment",[
            "appointments"=>$appointments,
            "customers" => $customers,
        ]);
    }
    public function save_appointment(Request $request){
        $request->validate([
           "appointment_staff"=>"required",
            "appointment_purpose"=>"required",
            "appointment_project"=>"required",
            "appointment_status"=>"required",
            "customer_id"=>"required",
        ],[
            "appointment_staff.required"=>"Vui long nhap ten nhan vien phu trach",
            "appointment_purpose.required"=>"Vui long nhap muc dich cuoc hen",
            "appointment_project.required"=>"Vui long nhap ten du an",
            "appointment_status.required"=>"Vui long nhap tinh trang buoi hen",
            "customer_id.required"=>"Vui long nhap ma khach hang",
        ]);
        $data = array();
        $data["appointment_staff"] = $request->get("appointment_staff");
        $data["appointment_purpose"] = $request->get("appointment_purpose");
        $data["appointment_project"] = $request->get("appointment_project");
        $data["appointment_status"] = $request->get("appointment_status");
        $data["customer_id"] = $request->get("customer_id");
        try{
            $appointment = Appointment::create($data);
            auth()->user()->notify(new Message($appointment));
            return redirect()->to("/admin/customer-details/". $data["customer_id"]);
        }catch (\Exception $e){
            abort(404);
        }
    }
    public function appointment_details($appointment_id){
        try{
            $appointment = Appointment::findOrFail($appointment_id);
            return view("admin.customer.appointment.appointment_details", [
                "appointment" => $appointment,
                "edit"=>false
            ]);
        }catch (\Exception $e){
            abort(404);
        }
    }
    public function edit_appointment($appointment_id){
        try{
            $appointment = Appointment::findOrFail($appointment_id);

            return view("admin.customer.appointment.appointment_details", [
                "appointment" => $appointment,
                "edit"=>true,
            ]);
        }catch (\Exception $e){
            abort(404);
        }
    }
    public function update_appointment(Request $request,$appointment_id){
        $request->validate([
            "appointment_purpose"=>"required",
            "appointment_project"=>"required",
            "appointment_status"=>"required",
        ],[
            "appointment_purpose.required"=>"Vui long nhap muc dich cuoc hen",
            "appointment_project.required"=>"Vui long nhap ten du an",
            "appointment_status.required"=>"Vui long nhap tinh trang buoi hen",
        ]);
         try{
             $data = array();
             $data["appointment_staff"] = $request->get("appointment_staff");
             $data["appointment_purpose"] = $request->get("appointment_purpose");
             $data["appointment_project"] = $request->get("appointment_project");
             $data["appointment_status"] = $request->get("appointment_status");
             $appointment = Appointment::findOrFail($appointment_id);
            $appointment->update($data);
             Session::put("message_edit","Edit appointment successfully");
            return redirect()->to("/admin/appointment-details/".$appointment_id);
        }catch (\Exception $e){
            abort(404);
        }
    }
    public function delete_appointment($appointment_id){
        try{
            $appointment = Appointment::findOrFail($appointment_id);
            $customer_id = $appointment->customer_id;
            $appointment->delete();
            Session::put("message_delete","Delete appointment successfully");
            return redirect()->to("/admin/customer-details/".$customer_id);
        }catch (\Exception $e){
            abort(404);
        }
    }

}

