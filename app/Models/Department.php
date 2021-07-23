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
        return $this->hasMany(User::class, "department_id", "department_id");
    }

    public function scopeSearch($query, $search) {
        if($search == "" || $search == null) {
            return $query;
        }
        return $query->where("department_name", "LIKE", "%".$search."%");

    }

    public function scopeCode($query, $department_code) {
        if($department_code == 0 || $department_code == null ) {
            return $query;
        }
        return $query->where("department_code", $department_code);


    }

    public function scopePic($query, $department_pic) {
        if($department_pic == 0 || $department_pic == null) {
            return $query;
        }
        return $query->where("department_pic", $department_pic);

    }
}
