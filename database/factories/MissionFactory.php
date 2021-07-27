<?php

namespace Database\Factories;

use App\Models\Mission;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class MissionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Mission::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "mission_title" => $this->faker->text(70),
            "mission_content" => $this->faker->text(500),
            "mission_deadline" => Carbon::now()->addDay(rand(1, 10)),
            "mission_note" => $this->faker->text(150),
            "mission_status" => 0,
            "pic_id" => rand(25, 100),
            "staff_id" => rand(40, 600)
        ];
    }
}
