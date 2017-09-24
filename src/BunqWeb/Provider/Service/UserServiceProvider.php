<?php
namespace BunqWeb\Provider\Service;

use BunqWeb\EventSubscriber\UserEventSubscriber;
use Pimple\Container;
use Pimple\ServiceProviderInterface;
use Silex\Api\EventListenerProviderInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class UserServiceProvider implements ServiceProviderInterface, EventListenerProviderInterface
{
    /**
     * {@inheritdoc}
     */
    public function register(Container $pimple)
    {
    }

    public function subscribe(Container $app, EventDispatcherInterface $dispatcher)
    {
        $dispatcher->addSubscriber(new UserEventSubscriber($app['session']));
    }
}