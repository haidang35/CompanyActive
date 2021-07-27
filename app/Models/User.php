<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'birthday',
        'department_id',
        'address',
        'password',
        'fb_id',
        'google_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'profile_photo_url',
    ];

    public function receivesBroadcastNotificationsOn()
    {
        return 'users.' . $this->id;
    }

    public function Department()
    {
        return $this->belongsTo(Department::class, "department_id", "department_id");
    }

    public function scopeSearch($query, $search)
    {
        if ($search == '' || $search == null) {
            return $query;
        }
        return $query->where("name", 'LIKE', "%" . $search . "%")
            ->orWhere("email", 'LIKE', "%" . $search . "%")
            ->orWhere("phone", 'LIKE', "%" . $search . "%");
    }

    public function scopeDepartment($query, $department_id)
    {
        if($department_id == '' || $department_id == null) {
            return $query;
        }
        return $query->where('department_id', $department_id);
    }
}
