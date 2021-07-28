<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    use HasFactory;
    protected $table = "missions";
    protected $primaryKey = "id";
    protected $fillable = [
        "mission_title",
        "mission_content",
        "mission_deadline",
        "mission_note",
        "mission_status",
        "progress",
        "pic_id",
        "staff_id"
    ];

    public function Pic()
    {
        return $this->belongsTo(User::class, 'pic_id', 'id');
    }

    public function Staff()
    {
        return $this->belongsTo(User::class, 'staff_id', 'id');
    }

    public function scopeSearch($query, $search)
    {
        if ($search == "" || $search == null) {
            return $query;
        }
        return $query->where("mission_title", "LIKE", "%" . $search . "%");
    }

    public function scopeStatus($query, $status)
    {
        if ($status == "" || $status == null) {
            return $query;
        }
        return $query->where("mission_status", $status);
    }

    public function scopeTime($query, $timeId)
    {
        $tomorrow = Carbon::tomorrow();
        $today = Carbon::today();
        $startOfWeek = $today->startOfWeek();
        $endOfWeek = $today->endOfWeek();
        if ($timeId == 1) {
            return $query->whereDate('mission_deadline','=' , Carbon::today()->toDateString());
        } else if ($timeId == 2) {
            return $query->whereDate('mission_deadline', '=', $tomorrow->toDateString());
        } else if ($timeId == 3) {
            return $query->whereDay('mission_deadline', '>=', $startOfWeek)->whereDate('mission_deadline', '<=', $endOfWeek);
        } else if ($timeId == 4) {
            return $query->whereMonth('mission_deadline', Carbon::now()->month);
        } else {
            return $query;
        }
    }

    public function scopeDate($query, $date) {
        if($date == null || $date == "") {
            return $query;
        }
        return $query->whereDate('mission_deadline','=' ,$date);
        
    }
}
