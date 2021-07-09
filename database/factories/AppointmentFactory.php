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
            "appointment_staff"=>$this->faker->name(),
            "appointment_purpose"=>$this->faker->text(100),
            "appointment_project"=>$this->faker->text(100),
            "appointment_status"=>$this->faker->text(100),
            "customer_id"=>random_int(1,20),
        ];
    }
}
