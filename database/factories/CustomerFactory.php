<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Customer::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "customer_name"=>$this->faker->name(),
            "customer_phone" => $this->faker->unique()->phoneNumber,
            "customer_address"=>$this->faker->text(100),
            "customer_relationship"=>$this->faker->text(100),
            "staff_id"=>random_int(1,300),
        ];
    }
}
