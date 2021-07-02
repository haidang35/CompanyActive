<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $table = "customers";
    protected $primaryKey = "customer_id";
    protected $fillable=[
        "customer_name",
        "customer_phone",
        "customer_address",
        "customer_relationship",
        "staff_id",
    ];


    public function Staff(){
        return $this->belongsTo(Staff::class,"staff_id","staff_id");
    }
    public function Appointments(){
        return $this->hasMany(Appointment::class,"appointment_id","appointment_id");
    }
    public function scopeName($query,$search){
        if($search=="" || $search==null){
            return $query;
        }else{
            return $query->where("customer_name","LIKE","%$search%");
        }
    }
    public function scopePhone($query,$customer_phone){
        if($customer_phone==null || $customer_phone==""){
            return $query;
        }else{
            return $query->where("customer_phone","LIKE","%$customer_phone%");
        }
    }
    public function scopeStaff($query,$staff_id){
        if($staff_id==null || $staff_id==0){
            return $query;
        }else{
            return $query->where("staff_id",$staff_id);
        }
    }

}
