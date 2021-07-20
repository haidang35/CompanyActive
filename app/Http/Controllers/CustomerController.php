<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Customer;
use App\Models\Notification;
use App\Models\Staff;
use App\Models\User;
use App\Notifications\Message;
use App\Notifications\ReplyToActive;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class CustomerController extends Controller
{
    public function customers(Request $request){
        $staffId = $request->get("staff_id");
        $customerName = $request->get("customer_name");
        $customerPhone = $request->get("customer_phone ");
        $customers = Customer::with("Appointment")->name($customerName)->phone($customerPhone)->staff($staffId)->paginate(20);
        $staffs = Staff::all();
        return view("admin.customer.customer_information.customer_list",[
            "customers"=>$customers,
            "staffs"=>$staffs,
//            "search_customer"=>$search_customer
        ]);
    }
    public function create_customer(){
        $customers = Customer::all();
        $staffs = Staff::all();
        Session::put("message_success","Add new customer successfully");
        return view("admin.customer.customer_information.create_customer",[
            "customers"=>$customers,
            "staffs"=>$staffs
        ]);
    }

    public function save_customer(Request $request){
        $request->validate([
//            "customer_name"=>"required",
//            "customer_phone"=>"required",
//            "customer_relationship"=>"required",
            "staff_id"=>"required",
        ],[
//            "customer_name.required"=>"Vui long nhap ten khach hang",
//            "customer_phone.required"=>"Vui long nhap so dien thoai",
//            "customer_relationship.required"=>"Vui long nhap moi quan he giua doanh nghiep va khach hang",
            "staff_id.required"=>"Vui long nhap ma nguoi phu trach",
        ]);

        $data = array();
        $data["customer_name"] = $request->get("customer_name");
        $data["customer_phone"] = $request->get("customer_phone");
        $data["customer_address"] = $request->get("customer_address");
        $data["customer_relationship"] = $request->get("customer_relationship");
        $data["staff_if"] = $request->get("staff_id");
        try{
            Customer::create($data);
           return redirect()->to("/admin/customers");
        }catch (Exception $e){
            abort(404);
        }
    }
    public function customer_details($customer_id){
        $customer = Customer::with("Appointment")->where("customer_id",$customer_id)->first();
        $appointments = Appointment::with("Customer")->where("customer_id",$customer_id)->get();

        return view("admin.customer.customer_information.customer_details",[
            "customer"=>$customer,
            "appointments"=>$appointments,
            "edit"=>false,
        ]);
    }
    public function edit_customer($customer_id){
        $customer = Customer::with("Appointment")->where("customer_id",$customer_id)->first();
        $appointments = Appointment::with("Customer")->where("customer_id",$customer_id)->get();

        return view("admin.customer.customer_information.customer_details",[
            "customer" => $customer,
            "appointments"=>$appointments,
            "edit"=>true
        ]);
    }
    public function update_customer(Request $request,$customer_id){
        $customer = Customer::findOrFail($customer_id);
        $request->validate([
            "customer_name"=>"required",
            "customer_phone"=>"required",
            "customer_relationship"=>"required",
        ],[
            "customer_name.required"=>"Vui long nhap ten khach hang",
            "customer_phone.required"=>"Vui long nhap so dien thoai",
            "customer_relationship.required"=>"Vui long nhap moi quan he giua doanh nghiep va khach hang",
        ]);

        $data = array();
        $data["customer_name"] = $request->get("customer_name");
        $data["customer_phone"] = $request->get("customer_phone");
        $data["customer_address"] = $request->get("customer_address");
        $data["customer_relationship"] = $request->get("customer_relationship");
        try {
            $customer->update($data);
            Session::put("message_edit","Edit customer successfully");
            return redirect()->to("/admin/customer-details/".$customer->customer_id);
        }catch (Exception $e){
            abort(404);
        }
    }
    public function delete_customer($customer_id){
        $customer = Customer::findOrFail($customer_id);
        try{
            $customer->delete();
            Session::put("message_delete","Delete customer successfully");

            return redirect()->to("/admin/customers");
        }catch (Exception $e){
            abort(404);
        }
    }


}
