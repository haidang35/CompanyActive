<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Staff;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function customers(Request $request){
        $staffId = $request->get("staffId");
        $customerName = $request->get("customerName");
        $customerPhone = $request->get("customerPhone");
        $customers = Customer::with("Staff")->name($customerName)->phone($customerPhone)->staff($staffId)->paginate(20);
        $staffs = Staff::all();
//        $customers = Customer::with("Appointments")->get();
        return view("admin.customer.customer_information.customer_list",[
            "customers"=>$customers,
            "staffs"=>$staffs,
        ]);
    }
    public function create_customer(){
        $customers = Customer::all();
        $staffs = Staff::all();
        return view("admin.customer.customer_information.create_customer",[
            "customers"=>$customers,
            "staffs"=>$staffs
        ]);
    }

    public function save_customer(Request $request){
        $request->validate([
            "customer_name"=>"required",
            "customer_phone"=>"required",
            "customer_relationship"=>"required",
            "staff_id"=>"required",
        ],[
            "customer_name.required"=>"Vui long nhap ten khach hang",
            "customer_phone.required"=>"Vui long nhap so dien thoai",
            "customer_relationship.required"=>"Vui long nhap moi quan he giua doanh nghiep va khach hang",
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
        }catch (\Exception $e){
            abort(404);
        }
    }
    public function customer_details($customer_id){
        $customer = Customer::findOrFail($customer_id);
        return view("admin.customer.customer_information.customer_details",[
            "customer"=>$customer
        ]);
    }
    public function edit_customer($customer_id){
        $customer = Customer::findOrFail($customer_id);
        return view("admin.customer.customer_information.customer_list",[
            "customer" => $customer,
        ]);

    }
    public function delete_customer($customer_id){
        $customer = Customer::findOrFail($customer_id);
        try{
            $customer->delete();
            return redirect()->to("/admin/customers");
        }catch (\Exception $e){
            abort(404);
        }
    }


}
