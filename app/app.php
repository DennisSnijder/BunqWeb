<?php

use BunqWeb\Provider\Controller\APIControllerProvider;
use BunqWeb\Provider\Controller\DashboardControllerProvider;
use BunqWeb\Provider\Service\BunqServiceProvider;
use BunqWeb\Provider\Service\ConfigServiceProvider;
use BunqWeb\Provider\Service\RepositoryServiceProvider;
use Symfony\Component\HttpFoundation\Request;

require_once __DIR__ . '/bootstrap.php';

$app = new Silex\Application();
$app['debug'] = true;

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->register(new Silex\Provider\TwigServiceProvider, [
    'twig.path' => RESOURCES_PATH . '/views',
]);
$app->register(new \Silex\Provider\SessionServiceProvider);

//application
$app->register(new ConfigServiceProvider);
$app->register(new BunqServiceProvider);
$app->register(new RepositoryServiceProvider);

$app->mount('/', new DashboardControllerProvider);
$app->mount('/api', new APIControllerProvider);

return $app;
