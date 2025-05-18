use Illuminate\Support\Facades\Gate;
use App\Models\User;

public function boot(): void
{
    $this->registerPolicies();

    Gate::define('admin', function (User $user) {
        return $user->role === 'admin';
    });

    Gate::define('manage-events', function (User $user) {
        return $user->role === 'admin';
    });
}
