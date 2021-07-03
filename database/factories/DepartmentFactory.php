<?php

namespace Database\Factories;

use App\Models\Department;
//use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory;


class DepartmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Department::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "department_name" => $this->faker->company,
            "department_code" => $this->faker->unique()->currencyCode,
            "department_pic"  => $this->faker->userName,
            "department_desc" => $this->faker->text(50),
        ];
    }
}
