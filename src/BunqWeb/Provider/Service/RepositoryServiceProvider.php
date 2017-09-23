<?php
namespace BunqWeb\Provider\Service;


use BunqWeb\Repository\UserRepository;
use Pimple\Container;
use Pimple\ServiceProviderInterface;

class RepositoryServiceProvider implements ServiceProviderInterface
{

    /**
     * {@inheritdoc}
     */
    public function register(Container $pimple)
    {
        $pimple['user.repository'] = function() use ($pimple) {
            return new UserRepository($pimple['bunq.api.context']);
        };
    }
}