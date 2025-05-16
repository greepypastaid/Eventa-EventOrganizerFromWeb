<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illimunate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthResolver
{
    public function register($root, array $args)
    {
        $user = User::create([
            'name' => $args['name'],
            'email' => $args['email'],
            'password' => Hash::make($args['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'token' => $user->createToken('auth_token')->plainTextToken,
            'user' => $user,
        ];
    }
    public function login($root, array $args)
    {
        $user = User::where('email', $args['email'])->first();

        if (! $user || ! Hash::check($args['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
        ];
    }
}