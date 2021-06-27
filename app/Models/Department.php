<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;
    protected $table = "departments";
    protected $primaryKey = "department_id";
    protected $fillable = [
        "department_name",
        "department_code",
        "department_pic",
        "department_desc",
        "department_members",
    ];
}
