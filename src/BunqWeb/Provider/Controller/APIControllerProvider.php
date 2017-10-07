<?php

namespace BunqWeb\Provider\Controller;

use BunqWeb\Controller\API\AttachmentController;
use BunqWeb\Controller\API\LoginController;
use BunqWeb\Controller\API\MonetaryAccountController;
use Silex\Api\ControllerProviderInterface;
use Silex\Application;
use Silex\ControllerCollection;

class APIControllerProvider implements ControllerProviderInterface
{
    /**
     * {@inheritdoc}
     */
    public function connect(Application $app): ControllerCollection
    {
        /** @var ControllerCollection $collection */
        $collection = $app['controllers_factory'];

        $loginController = new LoginController(
            $app['user.repository'],
            $app['session']
        );

        $attachmentController = new AttachmentController(
            $app['bunq.api.context']
        );

        $monetaryAccountController = new MonetaryAccountController(
            $app['session'],
            $app['bunq.api.context']
        );

        $collection->get('/users', [$loginController, 'getAvailableUsers']);
        $collection->match('/login', [$loginController, 'handleLoginRequest']);

        $collection->get('/attachment/{uuid}', [$attachmentController, 'getAttachmentForUUID']);
        $collection->get('/payments/{monetaryAccountId}', [$monetaryAccountController, 'getPaymentsForMonetaryAccount']);
        $collection->get('/payment/{monetaryAccountId}/{paymentId}', [$monetaryAccountController, 'getPaymentInfoForPaymentId']);
        $collection->get('/accounts', [$monetaryAccountController, 'getMonetaryAccountForCurrentUser']);

        return $collection;
    }
}