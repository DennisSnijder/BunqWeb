<?php

namespace BunqWeb\Controller;


use bunq\Context\ApiContext;
use bunq\Model\Generated\AttachmentPublic;
use bunq\Model\Generated\AttachmentPublicContent;
use bunq\Model\Generated\Avatar;
use GuzzleHttp\Psr7\Stream;
use Symfony\Component\HttpFoundation\Response;

class AttachmentController
{
    /**
     * @var ApiContext
     */
    private $context;

    public function __construct(ApiContext $context)
    {

        $this->context = $context;
    }

    public function getAttachment($uuid)
    {
       $request =  AttachmentPublicContent::listing($this->context, $uuid);

        /** @var Stream $attachment */
        $attachment = $request->getValue();

       return new Response($attachment, 200, [
           'Content-Type' => 'image'
       ]);
    }

}