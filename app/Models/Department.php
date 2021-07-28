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

    public function Manager() {
        return $this->belongsTo(User::class, "department_pic", "id");
    }

    public function Staff() {
        return $this->hasMany(User::class, "department_id", "department_id");
    }

    public function scopeSearch($query, $search) {
        if($search == "" || $search == null) {
            return $query;
        }
        return $query->where("department_name", "LIKE", "%".$search."%")
                    ->orWhere("department_code", "LIKE","%".$search."%" );

    }


    public function scopePic($query, $pic) {
        if($pic == 0 || $pic == null) {
            return $query;
        }
        return $query->where("department_pic", $pic);

    }
}
