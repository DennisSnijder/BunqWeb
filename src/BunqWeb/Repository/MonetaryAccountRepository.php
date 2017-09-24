<?php
namespace BunqWeb\Repository;


use bunq\Context\ApiContext;
use bunq\Model\Generated\MonetaryAccount;
use bunq\Model\Generated\MonetaryAccountBank;

class MonetaryAccountRepository
{

    /**
     * @var ApiContext
     */
    private $context;

    public function __construct(ApiContext $context)
    {
        $this->context = $context;
    }

    public function getMonetaryAccountsForUser(int $userId): array
    {
        $accounts = MonetaryAccountBank::listing($this->context, $userId);
        return $accounts->getValue();
    }
}