<?php
use BunqWeb\Controller\MainController;
use BunqWeb\Manager\BunqWebManager;
use BunqWeb\Repository\BunqWebRepository;
use Silex\Provider\FormServiceProvider;

require_once __DIR__ . '/../vendor/autoload.php';

$app = new Silex\Application();

$app->register(new Silex\Provider\ServiceControllerServiceProvider());
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());
$app->register(new Silex\Provider\SessionServiceProvider());

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
        'driver' => 'pdo_sqlite',
        'path' => __DIR__ . '/../data/data.db',
    ),
));

$app->register(new Silex\Provider\ValidatorServiceProvider());

$app->register(new FormServiceProvider());


$app['BunqWebManager'] = $app->share(function () use ($app) {
    return new BunqWebManager($app['BunqWebRepository'], $app);
});

$app['BunqWebRepository'] = $app->share(function () use ($app) {
    return new BunqWebRepository($app['db']);
});

$app['MainController'] = $app->share(function () use ($app) {
    return new MainController($app['twig'], $app['BunqWebManager']);
});



/* twig service provider */
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__ . '/../src/BunqWeb/Resources/views/',
));

$app->get('/', 'MainController:renderOverview');

$app['debug'] = true;

$app->run();
