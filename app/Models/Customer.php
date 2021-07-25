<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $table = "customers";
    protected $primaryKey = "id";
    protected $fillable=[
        "customer_name",
        "customer_email",
        "customer_phone",
        "customer_address"
    ];

    public function Appointment(){
        return $this->hasMany(Appointment::class,"customer_id","id");
    }

    public function scopeName($query,$search){
        if($search=="" || $search==null){
            return $query;
        }else{
            return $query->where("customer_name","LIKE","%".$search."%");
        }
    }

    public function scopePhone($query,$customerPhone){
        if($customerPhone==null || $customerPhone==""){
            return $query;
        }else{
            return $query->where("customer_phone","LIKE","%$customerPhone%");
        }
    }

    public function scopeStaff($query,$staffId){
        if($staffId==null || $staffId==0){
            return $query;
        }else{
            return $query->where("staff_id",$staffId);
        }
    }
}
