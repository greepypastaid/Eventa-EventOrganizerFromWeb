<?php

namespace App\GraphQL\Mutations;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;

class NotificationMutation
{
    public function sendNotification($root, array $args)
    {
        
        // Check if the user is authenticated
        if (!Auth::check()) {
            throw new AuthorizationException('Anda harus login untuk mengirim notifikasi.');
        }
        
        $user = Auth::user();
        
        // Uncomment the following lines if you want to restrict notification sending to authenticated users
        /*
        // Only admin can send notifications
        if ($user->role !== 'admin') {
            throw new \Exception('Tidak diizinkan: Hanya admin yang dapat mengirim notifikasi.');
        }
        
        $title = $args['input']['title'];
        $message = $args['input']['message'];
        $userIds = $args['input']['userIds'];
        */
        
        $notifications = [];
        
        foreach ($userIds as $userId) {
            $recipient = User::findOrFail($userId);
            
            $notification = Notification::create([
                'title' => $title,
                'message' => $message,
                'user_id' => $recipient->id,
                'sent_at' => now(),
            ]);
            
            $notifications[] = $notification;
        }
        
        return $notifications;
    }
}