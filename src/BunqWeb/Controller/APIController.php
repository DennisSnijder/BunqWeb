<?php

namespace BunqWeb\Controller;


use bunq\Context\ApiContext;
use bunq\Model\Generated\AttachmentPublicContent;
use bunq\Model\Generated\Payment;
use BunqWeb\Model\User;
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

    public function __construct(ApiContext $context, Session $session)
    {
        $this->context = $context;
        $this->session = $session;
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

}