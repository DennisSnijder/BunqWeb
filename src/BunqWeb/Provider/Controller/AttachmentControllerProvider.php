<?php
namespace BunqWeb\Provider\Controller;


use BunqWeb\Controller\AttachmentController;
use Silex\Api\ControllerProviderInterface;
use Silex\Application;
use Silex\ControllerCollection;

class AttachmentControllerProvider implements ControllerProviderInterface
{

    /**
     * {@inheritdoc}
     */
    public function connect(Application $app): ControllerCollection
    {
        /** @var ControllerCollection $collection */
        $collection = $app['controllers_factory'];

        $attachmentController = new AttachmentController(
            $app['bunq.api.context']
        );

        $collection->get('/{uuid}', [$attachmentController, 'getAttachment']);

        return $collection;
    }
}