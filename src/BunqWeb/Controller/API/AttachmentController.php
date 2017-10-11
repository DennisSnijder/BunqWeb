<?php
namespace BunqWeb\Controller\API;

use bunq\Context\ApiContext;
use bunq\Model\Generated\Endpoint\AttachmentPublicContent;
use GuzzleHttp\Psr7\Stream;
use Symfony\Component\HttpFoundation\Response;

class AttachmentController
{
    /**
     * @var ApiContext
     */
    private $apiContext;

    public function __construct(ApiContext $apiContext)
    {
        $this->apiContext = $apiContext;
    }

    public function getAttachmentForUUID($uuid)
    {
        $request =  AttachmentPublicContent::listing($this->apiContext, $uuid);

        /** @var Stream $attachment */
        $attachment = $request->getValue();

        return new Response($attachment, 200, [
            'Content-Type' => 'image',
            'Cache-Control' => 'max-age=86400'
        ]);
    }
}