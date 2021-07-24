<?php

namespace Database\Factories;

use App\Models\Appointment;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Appointment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "appointment_title" => $this->faker->title(),
            "appointment_time" => $this->faker->time(),
            "appointment_desc" => $this->faker->text(50),
            "appointment_status" => rand(0, 1),
            "customer_id" => random_int(1, 200),
            "staff_id" => random_int(1, 500),
        ];
    }
}
