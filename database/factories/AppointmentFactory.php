<?php

namespace Database\Factories;

use App\Models\Appointment;
use Carbon\Carbon;
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
            "appointment_title" => $this->faker->text(30),
            "appointment_time" => Carbon::now()->addDay(rand(0, 10)),
            "appointment_desc" => $this->faker->text(50),
            "appointment_status" => 0,
            "customer_id" => random_int(1, 200),
            "staff_id" => random_int(1, 500),
        ];
    }
}
