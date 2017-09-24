<?php
namespace BunqWeb\Repository;

use bunq\Context\ApiContext;
use bunq\Model\Generated\User;
use bunq\Model\Generated\UserCompany;
use bunq\Model\Generated\UserPerson;
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

    /**
     * Currently the User::get seems to be broken.
     * that's why this solution is a bit weird.
     * https://github.com/bunq/sdk_php/issues/51
     *
     * todo: fix this once the issue is resolved.
     */
    public function getUserByIdentifier($id, $type)
    {
        $user = new User();

        if($type == DomainUser::TYPE_COMPANY) {
            $userRequest = UserCompany::get($this->context, $id);
            $user->setUserCompany($userRequest->getValue());
        } else {
            $userRequest = UserPerson::get($this->context, $id);
            $user->setUserPerson($userRequest->getValue());
        }

        return $this->hydrateUser($user);
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