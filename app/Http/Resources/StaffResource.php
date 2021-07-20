<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StaffResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "staff_id" => $this->staff_id,
            "staff_name" => $this->staff_name,
            "staff_birthday" => $this->staff_birthday,
            "staff_email" => $this->staff_email,
            "staff_phone" => $this->staff_phone,
            "staff_address" => $this->staff_address,
            "department_id" => $this->department_id
        ];
    }
}
