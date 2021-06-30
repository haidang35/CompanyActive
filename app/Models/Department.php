<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = "departments";
    protected $primaryKey = "department_id";
    protected $fillable = [
        "department_name",
        "department_code",
        "department_pic",
        "department_desc",
    ];

    public function Staff() {
        return $this->hasMany(Staff::class, "department_id", "department_id");
    }
}
