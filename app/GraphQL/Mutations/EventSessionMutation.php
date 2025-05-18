<?php
namespace App\GraphQL\Mutations;

use App\Models\EventSession;

class EventSessionMutation
{
    public function delete($_, array $args): bool
    {
        $session = EventSession::find($args['id']);

        if (!$session) {
            return false; // or throw an error if preferred
        }

        return $session->delete();
    }
}
