<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;
    protected $table = "staffs";
    protected $primaryKey = "staff_id";
    protected $fillable = [
      "staff_name",
      "staff_birthday",
      "staff_email",
      "staff_phone",
      "staff_address",
      "department_id",
    ];

    public function Department() {
        return $this->belongsTo(Department::class, "department_id", "department_id");
    }
}
