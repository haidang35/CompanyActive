<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;
    protected $table = "appointments";
    protected $primaryKey = "appointment_id";
    protected $fillable=[
      "appointment_staff",
      "appointment_purpose",
      "appointment_project",
      "appointment_status",
//        "customer_id",
    ];
    public function Customer(){
        return $this->belongsTo(Customer::class,"customer_id","customer_id");
    }
    public function scopePurpose($query,$search ){
        if($search  == null || $search  == ""){
            return $query;
        }else{
            return $query->where("appointment_purpose","LIKE","%$search%");
        }
    }
    public function scopeProject($query,$appointmentProject){
        if($appointmentProject == null || $appointmentProject == 0){
            return $query;
        }else{
            return $query->where("appointment_project",$appointmentProject);
        }
    }
    public function scopeStatus($query,$appointmentStatus){
        if($appointmentStatus == null || $appointmentStatus == 0){
            return $query;
        }else{
            return $query->where("appointment_status",$appointmentStatus);
        }
    }

}
