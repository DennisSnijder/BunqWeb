<?php
namespace BunqWeb\Controller\API;


use bunq\Context\ApiContext;
use bunq\Model\Generated\MonetaryAccountBank;
use bunq\Model\Generated\Payment;
use BunqWeb\Model\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;

class MonetaryAccountController
{
    /**
     * @var Session
     */
    private $session;

    /**
     * @var ApiContext
     */
    private $apiContext;

    public function __construct(
        Session $session,
        ApiContext $apiContext
    ) {
        $this->session = $session;
        $this->apiContext = $apiContext;
    }

    public function getPaymentsForMonetaryAccount($monetaryAccountId): Response
    {
        /** @var User $user */
        $user = $this->session->get('user');
        $payments =  Payment::listing($this->apiContext, $user->getId(), $monetaryAccountId);

        return new JsonResponse($payments->getValue());
    }

    public function getMonetaryAccountForCurrentUser(): Response
    {
        /** @var User $user */
        $user = $this->session->get('user');
        $accounts = MonetaryAccountBank::listing($this->apiContext, $user->getId());

        return new JsonResponse($accounts->getValue());
    }
}