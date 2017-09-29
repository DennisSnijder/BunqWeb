<?php

namespace BunqWeb\Provider\Controller;


use BunqWeb\Controller\APIController;
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

        $APIController = new APIController(
            $app['bunq.api.context'],
            $app['session'],
            $app['monetary.account.repository']
        );

        $collection->get('/attachment/{uuid}', [$APIController, 'getAttachmentForUUID']);
        $collection->get('/payments/{monetaryAccountId}', [$APIController, 'getPaymentsForMonetaryAccount']);
        $collection->get('/accounts', [$APIController, 'getMonetaryAccountForCurrentUser']);

        return $collection;
    }
}