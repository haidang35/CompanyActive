<?php

use Carbon\Carbon;
use Carbon\Factory;

if(! function_exists("formatDate")) {
    function formatDate($date) {
        if(! $date instanceof Factory)
            $date = Carbon::createFromDate($date);
        return $date->format("d/m/Y");
    }
}
