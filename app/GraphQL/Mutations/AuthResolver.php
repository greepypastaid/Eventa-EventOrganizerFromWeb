<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthResolver
{
    public function register($root, array $args)
    {
        $user = User::create([
            'name' => $args['name'],
            'email' => $args['email'],
            'password' => Hash::make($args['password']),
            'role' => $args['role'] ?? 'user',
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
    public function logout($root, array $args)
    {
        $user = Auth::user();

        if ($user) {
            $user->tokens()->delete();
            return [
                'message' => 'Logged out successfully',
            ];
        }

        return [
            'message' => 'No user logged in',
        ];
    }
    public function changePassword($root, array $args)
    {
        $user = Auth::user();
        
        if (!$user || !Hash::check($args['currentPassword'], $user->password)) {
            throw new \Exception('Current password is incorrect');
        }
        
        $user->password = Hash::make($args['newPassword']);
        $user->save();
        
        return true;
    }

    public function requestPasswordReset($root, array $args)
    {
        $status = Password::sendResetLink(
            ['email' => $args['email']]
        );
        
        return $status === Password::RESET_LINK_SENT;
    }

    public function resetPassword($root, array $args)
    {
        $status = Password::reset(
            [
                'email' => $args['email'],
                'token' => $args['token'],
                'password' => $args['password'],
                'password_confirmation' => $args['password'],
            ],
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();
            }
        );
        
        return $status === Password::PASSWORD_RESET;
    }

    public function updateProfile($root, array $args)
    {
        $user = Auth::user();
        
        if (!$user) {
            throw new \Exception('Not authenticated');
        }
        
        if (isset($args['name'])) {
            $user->name = $args['name'];
        }
        
        if (isset($args['email'])) {
            // Check if email is already taken by another user
            $existingUser = User::where('email', $args['email'])
                              ->where('id', '!=', $user->id)
                              ->first();
            
            if ($existingUser) {
                throw new \Exception('Email already taken');
            }
            
            $user->email = $args['email'];
        }
        
        $user->save();
        
        return $user;
    }
}