<?php

use BunqWeb\Provider\Controller\AttachmentControllerProvider;
use BunqWeb\Provider\Controller\DashboardControllerProvider;
use BunqWeb\Provider\Controller\LoginControllerProvider;
use BunqWeb\Provider\Service\BunqServiceProvider;
use BunqWeb\Provider\Service\ConfigServiceProvider;
use BunqWeb\Provider\Service\RepositoryServiceProvider;
use BunqWeb\Provider\Service\UserServiceProvider;

require_once __DIR__ . '/bootstrap.php';

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\TwigServiceProvider, [
    'twig.path' => RESOURCES_PATH . '/views',
]);
$app->register(new \Silex\Provider\SessionServiceProvider);


//application
$app->register(new ConfigServiceProvider);
$app->register(new BunqServiceProvider);
$app->register(new RepositoryServiceProvider);
$app->register(new UserServiceProvider);

$app->mount('/login', new LoginControllerProvider);
$app->mount('/', new DashboardControllerProvider);

$app->mount('/attachment', new AttachmentControllerProvider);

return $app;
