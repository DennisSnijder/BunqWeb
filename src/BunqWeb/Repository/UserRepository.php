<?php
namespace BunqWeb\Repository;

use bunq\Context\ApiContext;
use bunq\Model\Generated\Endpoint\User;
use BunqWeb\Model\User as DomainUser;

class UserRepository
{
    /**
     * @var ApiContext
     */
    private $context;

    public function __construct(ApiContext $context)
    {
        $this->context = $context;
    }

    public function getUsers(): array
    {
        $userListing = User::listing($this->context);
        return $this->hydrateMultipleUsers($userListing->getValue());
    }

    public function getUserByIdentifier($id)
    {
        $user = User::get($this->context, $id);
        return $this->hydrateUser($user->getValue());
    }

    private function hydrateMultipleUsers(array $users): array
    {
        $domainUsers = [];
        foreach($users as $user) {
            $domainUsers[] = $this->hydrateUser($user);
        }

        return $domainUsers;
    }

    private function hydrateUser(User $user): DomainUser
    {
        if($user->getUserCompany()) {
            return DomainUser::fromUserCompany($user->getUserCompany());
        }

        return DomainUser::fromUserPerson($user->getUserPerson());
    }
}