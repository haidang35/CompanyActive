<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {

            $user = Socialite::driver('google')->stateless()->user();
            $findUser = User::where('google_id', $user->id)->first();
            $findUserByEmail = User::where("email", $user->email)->first();

            if($findUserByEmail && !$findUser) {
                return Redirect::to("login");
            } else if ($findUser) {
                Auth::login($findUser);
                return Redirect::to('/dashboard');

            } else {
                $newUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'google_id' => $user->id,
                    'password' => encrypt('123456789jdj')
                ]);
                Auth::login($newUser);
                return Redirect::to('/dashboard');
            }


        } catch (Exception $e) {
            dd($e->getMessage());
        }
    }
}
