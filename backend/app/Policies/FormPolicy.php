
<?php

namespace App\Policies;

use App\Models\Form;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FormPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any forms.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the form.
     */
    public function view(User $user, Form $form): bool
    {
        return $user->id === $form->user_id || $user->isAdmin();
    }

    /**
     * Determine whether the user can create forms.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the form.
     */
    public function update(User $user, Form $form): bool
    {
        return $user->id === $form->user_id || $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the form.
     */
    public function delete(User $user, Form $form): bool
    {
        return $user->id === $form->user_id || $user->isAdmin();
    }
}
