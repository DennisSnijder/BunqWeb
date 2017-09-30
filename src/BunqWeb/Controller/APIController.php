<?php

namespace BunqWeb\Controller;


use bunq\Context\ApiContext;
use bunq\Model\Generated\AttachmentPublicContent;
use bunq\Model\Generated\Payment;
use BunqWeb\Model\User;
use BunqWeb\Repository\MonetaryAccountRepository;
use GuzzleHttp\Psr7\Stream;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;

class APIController
{
    /**
     * @var ApiContext
     */
    private $context;

    /**
     * @var Session
     */
    private $session;

    /**
     * @var MonetaryAccountRepository
     */
    private $monetaryAccountRepository;

    public function __construct(ApiContext $context, Session $session, MonetaryAccountRepository $monetaryAccountRepository)
    {
        $this->context = $context;
        $this->session = $session;
        $this->monetaryAccountRepository = $monetaryAccountRepository;
    }

    public function getAttachmentForUUID($uuid)
    {
       $request =  AttachmentPublicContent::listing($this->context, $uuid);

        /** @var Stream $attachment */
        $attachment = $request->getValue();

       return new Response($attachment, 200, [
           'Content-Type' => 'image',
           'Cache-Control' => 'max-age=86400'
       ]);
    }


    public function getPaymentsForMonetaryAccount($monetaryAccountId)
    {
        /** @var User $user */
        $user = $this->session->get('user');

        $request =  Payment::listing($this->context, $user->getId(), $monetaryAccountId);

        return new Response(
            \GuzzleHttp\json_encode($request->getValue()),
            200,
            [
                'Content-Type' => 'application/json'
            ]
        );
    }

    public function getMonetaryAccountForCurrentUser()
    {
        /** @var User $user */
        $user = $this->session->get('user');

        $monetaryAccounts = $this->monetaryAccountRepository->getMonetaryAccountsForUser(
            $user->getId()
        );

        return new Response(
            \GuzzleHttp\json_encode($monetaryAccounts),
            200,
            [
                'Content-Type' => 'application/json'
            ]
        );
    }

}