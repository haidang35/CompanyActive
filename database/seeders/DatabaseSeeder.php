<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Customer;
use App\Models\Department;
use App\Models\Staff;
use App\Models\User;
use Database\Factories\StaffFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(10)->create();
        Department::factory(50)->create();
        Staff::factory(300)->create();
//        Customer::factory(10)->create();
//        Appointment::factory(10)->create();
//

    }
}
