<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AppoinmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return[
            "appointment_staff"=>$this->appointment_staff,
            "appointment_purpose"=>$this->appointment_purpose,
            "appointment_project"=>$this->appointment_project,
            "appointment_status"=>$this->appointment_status,
        ];
    }
}
