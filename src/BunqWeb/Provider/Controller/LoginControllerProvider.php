<?php
namespace BunqWeb\Provider\Controller;

use BunqWeb\Controller\LoginController;
use Silex\Api\ControllerProviderInterface;
use Silex\Application;
use Silex\ControllerCollection;

class LoginControllerProvider implements ControllerProviderInterface
{

    /**
     * {@inheritdoc}
     */
    public function connect(Application $app): ControllerCollection
    {
        /** @var ControllerCollection $collection */
        $collection = $app['controllers_factory'];

        $loginController = new LoginController(
            $app['twig'],
            $app['user.repository'],
            $app['session']
        );

        $collection->get('/', [$loginController, 'renderLoginPage']);
        $collection->post('/', [$loginController, 'handleLoginRequest']);

        return $collection;
    }
}