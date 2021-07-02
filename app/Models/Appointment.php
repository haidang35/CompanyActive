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
        "customer_id",
    ];
    public function Customer(){
        return $this->belongsTo(Customer::class,"customer_id","customer_id");
    }
    public function scopePurpose($query,$appointment_purpose){
        if($appointment_purpose == null || $appointment_purpose == 0){
            return $query;
        }else{
            return $query->where("appointment_purpose",$appointment_purpose);
        }
    }
    public function scopeProject($query,$appointment_project){
        if($appointment_project == null || $appointment_project == 0){
            return $query;
        }else{
            return $query->where("appointment_project",$appointment_project);
        }
    }
    public function scopeStatus($query,$appointment_status){
        if($appointment_status == null || $appointment_status == 0){
            return $query;
        }else{
            return $query->where("appointment_status",$appointment_status);
        }
    }

}
