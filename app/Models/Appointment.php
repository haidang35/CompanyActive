<?php

namespace App\Models;

use Carbon\Carbon;
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

    public function scopeSearch($query, $search) {
        if($search == "" || $search == null) {
            return $query;
        }
        return $query->where('appointment_title', 'LIKE', '%'.$search.'%');
    }

    public function scopeStatus($query, $status) {
        if($status == '' || $status == null) {
            return $query;
        }
        return $query->where('appointment_status', $status);
    }

    public function scopeTime($query, $timeId)
    {
        $tomorrow = Carbon::tomorrow();
        $today = Carbon::today();
        $startOfWeek = $today->startOfWeek();
        $endOfWeek = $today->endOfWeek();
        if ($timeId == 1) {
            return $query->whereDate('appointment_time','=' , Carbon::today()->toDateString());
        } else if ($timeId == 2) {
            return $query->whereDate('appointment_time', '=', $tomorrow->toDateString());
        } else if ($timeId == 3) {
            return $query->whereDay('appointment_time', '>=', $startOfWeek)->whereDate('appointment_time', '<=', $endOfWeek);
        } else if ($timeId == 4) {
            return $query->whereMonth('appointment_time', Carbon::now()->month);
        } else {
            return $query;
        }
    }

    public function scopeDate($query, $date) {
        if($date == null || $date == "") {
            return $query;
        }
        return $query->whereDate('appointment_time','=' ,$date);
        
    }
}
