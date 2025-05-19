<?php

namespace App\GraphQL\Queries;

use App\Models\Event;
use App\Models\Registration;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Access\AuthorizationException;
use Laravel\Sanctum\PersonalAccessToken;

class RegistrationQuery
{
    public function registrations($root, array $args)
    {
        Log::info('RegistrationQuery dipanggil');
        
        // Coba metode standar Auth::user()
        $user = Auth::user();
        
        // Jika tidak berhasil, coba ambil token dari request
        if (!$user) {
            $bearerToken = request()->bearerToken();
            
            if (!$bearerToken) {
                Log::info('Tidak ada token Bearer yang ditemukan');
                throw new AuthorizationException('Anda harus login untuk melihat pendaftaran.');
            }
            
            Log::info('Token Bearer ditemukan: ' . substr($bearerToken, 0, 10) . '...');
            
            try {
                // Coba cari token di database
                $tokenId = explode('|', $bearerToken)[0];
                $tokenModel = PersonalAccessToken::find($tokenId);
                
                if ($tokenModel) {
                    $user = $tokenModel->tokenable;
                    Log::info('User ditemukan melalui token ID: ' . $user->email);
                }
                
                if (!$user) {
                    // Jika tidak berhasil, coba dengan hash token
                    $hashedToken = hash('sha256', $bearerToken);
                    $tokenModel = PersonalAccessToken::where('token', $hashedToken)->first();
                    
                    if ($tokenModel) {
                        $user = $tokenModel->tokenable;
                        Log::info('User ditemukan melalui hash token: ' . $user->email);
                    }
                }
                
                if (!$user) {
                    // Coba metode lain - cari token di semua token pengguna
                    $hashedToken = hash('sha256', $bearerToken);
                    $user = User::whereHas('tokens', function($query) use ($bearerToken, $hashedToken) {
                        $query->where('token', $hashedToken)
                              ->orWhere('id', explode('|', $bearerToken)[0] ?? 0);
                    })->first();
                    
                    if ($user) {
                        Log::info('User ditemukan melalui query tokens: ' . $user->email);
                    }
                }
            } catch (\Exception $e) {
                Log::error('Error saat mencoba mendapatkan user dari token: ' . $e->getMessage());
            }
        }
        
        if (!$user) {
            throw new AuthorizationException('Anda harus login untuk melihat pendaftaran.');
        }
        
        $eventId = $args['eventId'];
        
        // If user is admin, return all registrations for the event
        if ($user->role === 'admin') {
            return Registration::where('event_id', $eventId)->get();
        }
        
        // Otherwise, return only the user's registrations for the event
        return Registration::where('event_id', $eventId)
            ->where('user_id', $user->id)
            ->get();
    }
}