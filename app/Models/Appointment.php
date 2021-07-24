<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;
    protected $table = "appointments";
    protected $primaryKey = "id";
    protected $fillable = [
        "appoinment_title",
        "appoinment_time",
        "appoinment_desc",
        "appointment_status",
        "customer_id",
        "staff_id"

    ];

    public function Customer()
    {
        return $this->belongsTo(Customer::class, "id", "customer_id");
    }
}
