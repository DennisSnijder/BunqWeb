<?php
namespace BunqWeb\Provider\Controller;


use BunqWeb\Controller\DashboardController;
use Silex\Api\ControllerProviderInterface;
use Silex\Application;
use Silex\ControllerCollection;

class DashboardControllerProvider implements ControllerProviderInterface
{

    /**
     * {@inheritdoc}
     */
    public function connect(Application $app): ControllerCollection
    {
        /** @var ControllerCollection $collection */
        $collection = $app['controllers_factory'];

        $dashboardController = new DashboardController(
            $app['twig'],
            $app['monetary.account.repository'],
            $app['session']
        );

        $collection->get('/', [$dashboardController, 'renderDashboardPage']);
        $collection->get('/react', [$dashboardController, 'renderDashboardReactPage']);

        return $collection;
    }
}