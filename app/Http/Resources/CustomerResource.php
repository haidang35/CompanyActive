<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
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
            "customer_id"=>$this->customer_id,
            "customer_name"=>$this->customer_name,
            "customer_phone"=>$this->customer_phone,
            "customer_address"=>$this->customer_address,
            "customer_relationship"=>$this->customer_relationship,
        ];
    }
}
