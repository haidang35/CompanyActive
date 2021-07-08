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
        "user_id",

    ];
    public function Customer()
    {
        return $this->belongsTo(Customer::class, "customer_id", "customer_id");
    }
}
