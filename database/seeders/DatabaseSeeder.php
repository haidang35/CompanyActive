<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Customer;
use App\Models\Department;
use App\Models\Staff;
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
        // \App\Models\User::factory(10)->create();
        Department::factory(50)->create();
        Staff::factory(300)->create();
















        //LINH
//
//        Customer::factory(20)->create();
//        Appointment::factory(20)->create();

    }
}
