<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $table = "customers";
    protected $primaryKey = "id";
    protected $fillable = [
        "customer_name",
        "customer_email",
        "customer_phone",
        "customer_address"
    ];

    public function Appointment()
    {
        return $this->hasMany(Appointment::class, "customer_id", "id");
    }

    public function scopeSearch($query, $search)
    {
        if ($search == "" || $search == null) {
            return $query;
        }

        return $query->where("customer_name", "LIKE", "%" . $search . "%")
            ->orWhere("customer_email", "LIKE", "%" . $search . "%")
            ->orWhere("customer_phone", "LIKE", "%" . $search . "%");
    }


    public function scopeStaff($query, $staffId)
    {
        if ($staffId == null || $staffId == 0) {
            return $query;
        } else {
            return $query->where("staff_id", $staffId);
        }
    }
}
