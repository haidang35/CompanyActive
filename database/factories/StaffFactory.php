<?php

namespace Database\Factories;

use App\Models\Staff;
use Illuminate\Database\Eloquent\Factories\Factory;

class StaffFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Staff::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "staff_name" => $this->faker->name,
            "staff_birthday" => $this->faker->date(),
            "staff_email" => $this->faker->unique()->email,
            "staff_phone" => $this->faker->unique()->phoneNumber,
            "staff_address" => $this->faker->address,
            "department_id" => rand(1, 30),
        ];
    }
}
