<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Customer;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function appointments(Request $request)
    {
        $search = $request->get("appointment_purpose");
        $appointmentProject = $request->get("appointment_project");
        $appointmentStatus = $request->get("appointment_status");
        $appointments = Appointment::with("Customer")->purpose($search)->project($appointmentProject)->status($appointmentStatus)->get();
        $customers = Customer::all();
        $select_appointment = Appointment::all();
        return view("admin.customer.customer_information.appointment_list", [
            "select_appointment" => $select_appointment,
            "appointments"=>$appointments,
            "customers"=>$customers
        ]);
    }
    public function form_appointment(){
        $appointments = Appointment::with("Customer")->get();
        $customers = Customer::with("Appointment")->get();
        return view("admin.customer.appointment.form_appointment",[
            "appointments"=>$appointments,
            "customers" => $customers
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
            return redirect()->to("/admin/customer-details/". $data["customer_id"]);
        }catch (\Exception $e){
            abort(404);
        }
    }
    public function appointment_details($appointment_id,$customer_id){
        $appointment = Appointment::with("Customer")->where("appointment_id",$appointment_id)->first();
        $customer = Customer::with("Appointment")->where("customer_id",$customer_id)->get();
        return view("admin.customer.appointment.appointment_details", [
            "appointment" => $appointment,
            "customer"=>$customer,
            "edit"=>false
        ]);
    }
    public function edit_appointment($appointment_id,$customer_id){
        $appointment = Appointment::with("Customer")->where("appointment_id",$appointment_id)->first();
        $customer = Customer::with("Appointment")->where("customer_id",$customer_id)->get();
        return view("admin.customer.appointment.appointment_details", [
            "appointment" => $appointment,
            "customer"=>$customer,
            "edit"=>true,
        ]);
    }
    public function update_appointment(Request $request,$appointment_id){
        $appointment = Appointment::findOrFail($appointment_id);
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
            $appointment->update($data);
            return redirect()->to("/admin/appointment-details/".$appointment->appointment_id);
        }catch (\Exception $e){
            abort(404);
        }
    }
    public function delete_appointment($appointment_id){
        $appointment = Appointment::findOrFail($appointment_id);
        try{
            $appointment->delete();
            return redirect()->to("/admin/customer-details/");
        }catch (\Exception $e){
            abort(404);
        }
    }

}

