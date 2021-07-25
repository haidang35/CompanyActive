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
        "appointment_title",
        "appointment_time",
        "appointment_desc",
        "appointment_status",
        "customer_id",
        "staff_id"

    ];

    public function Customer()
    {
        return $this->belongsTo(Customer::class, "customer_id", "id");
    }

    public function Staff()
    {
        return $this->hasMany(User::class, "id", "staff_id");
    }
}
