<?php

namespace App\GraphQL\Queries;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\PersonalAccessToken;

class MeQuery
{
    public function __invoke($_, array $args)
    {
        Log::info('MeQuery dipanggil');
        
        // Coba metode standar Auth::user()
        $user = Auth::user();
        
        if ($user) {
            Log::info('User ditemukan melalui Auth::user(): ' . $user->email);
            return $user;
        }
        
        // Jika tidak berhasil, coba ambil token dari request
        $bearerToken = request()->bearerToken();
        
        if (!$bearerToken) {
            Log::info('Tidak ada token Bearer yang ditemukan');
            return null;
        }
        
        Log::info('Token Bearer ditemukan: ' . substr($bearerToken, 0, 10) . '...');
        
        // Coba metode alternatif untuk mendapatkan user dari token
        try {
            // Coba cari token di database
            $tokenId = explode('|', $bearerToken)[0];
            $tokenModel = PersonalAccessToken::find($tokenId);
            
            if ($tokenModel) {
                $user = $tokenModel->tokenable;
                Log::info('User ditemukan melalui token ID: ' . $user->email);
                return $user;
            }
            
            // Jika tidak berhasil, coba dengan hash token
            $hashedToken = hash('sha256', $bearerToken);
            $tokenModel = PersonalAccessToken::where('token', $hashedToken)->first();
            
            if ($tokenModel) {
                $user = $tokenModel->tokenable;
                Log::info('User ditemukan melalui hash token: ' . $user->email);
                return $user;
            }
            
            // Coba metode lain - cari token di semua token pengguna
            $user = User::whereHas('tokens', function($query) use ($bearerToken, $hashedToken) {
                $query->where('token', $hashedToken)
                      ->orWhere('id', explode('|', $bearerToken)[0] ?? 0);
            })->first();
            
            if ($user) {
                Log::info('User ditemukan melalui query tokens: ' . $user->email);
                return $user;
            }
        } catch (\Exception $e) {
            Log::error('Error saat mencoba mendapatkan user dari token: ' . $e->getMessage());
        }
        
        // Tambahkan endpoint REST API untuk debugging
        Log::info('Semua metode gagal, coba gunakan endpoint /api/me sebagai alternatif');
        return null;
    }
}