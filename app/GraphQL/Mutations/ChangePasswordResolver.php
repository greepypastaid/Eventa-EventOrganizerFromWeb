<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class ChangePasswordResolver
{
    public function __invoke($_, array $args)
    {
        // Get the authenticated user
        $user = Auth::user();
        
        // Log debug information
        Log::info('ChangePassword attempt', [
            'user_id' => $user ? $user->id : 'not authenticated',
            'has_current_password' => isset($args['currentPassword']),
            'has_new_password' => isset($args['newPassword']),
        ]);
        
        // Check if user is authenticated
        if (!$user) {
            Log::error('ChangePassword failed: User not authenticated');
            throw new \Exception('User not authenticated');
        }
        
        // Verify the current password
        if (!Hash::check($args['currentPassword'], $user->password)) {
            Log::error('ChangePassword failed: Current password is incorrect', [
                'user_id' => $user->id,
                // Don't log actual passwords in production!
                'provided_password_length' => strlen($args['currentPassword']),
            ]);
            throw new \Exception('Current password is incorrect');
        }
        
        // Update the password
        try {
            $user->password = Hash::make($args['newPassword']);
            $user->save();
            
            Log::info('Password changed successfully', ['user_id' => $user->id]);
            return true;
        } catch (\Exception $e) {
            Log::error('ChangePassword failed: Error saving new password', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);
            throw new \Exception('Error updating password: ' . $e->getMessage());
        }
    }
}