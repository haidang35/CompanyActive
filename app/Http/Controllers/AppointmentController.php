<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Customer;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function appointments(Request $request)
    {
//        $customerName = $request->get("customer_name");
        $appointmentPurpose = $request->get("appointmentPurpose");
        $appointmentProject = $request->get("appointmentProject");
        $appointmentStatus = $request->get("appointmentStatus");
        $appointments = Appointment::with("Customer")->purpose($appointmentPurpose)->project($appointmentProject)->status($appointmentStatus)->get();
//        $customers = Customer::all();
        return view("admin.customer.appointment.appointment_list", [
            "appointments" => $appointments,
//            "customers"=>$customers
        ]);
    }
    public function create_appointment(){
        $appointments = Appointment::all();
        $customers = Customer::all();
        return view("admin.customer.appointment.create_appointment",[
            "appointments"=>$appointments,
            "customers"=>$customers
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
            Appointment::create($data);
            return redirect()->to("/admin/appointments");
        }catch (\Exception $e){
            abort(404);
        }
    }
    public function appointment_details(){
        return view("admin.customer.appointment.appointment_details");
    }

}

