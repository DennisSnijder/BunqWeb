<?php
namespace BunqWeb\Repository;

use bunq\Context\ApiContext;
use bunq\Model\Generated\User;

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
        return $userListing->getValue();
    }


    public function getUserByIdentifier($id): User
    {
        $userRequest = User::get($this->context, $id);
        return $userRequest->getValue();
    }

}