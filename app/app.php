<?php
use BunqWeb\Controller\MainController;
use BunqWeb\Manager\BunqWebManager;
use BunqWeb\Provider\Controller\DashboardControllerProvider;
use BunqWeb\Provider\Service\BunqServiceProvider;
use BunqWeb\Provider\Service\ConfigServiceProvider;
use BunqWeb\Provider\Service\RepositoryServiceProvider;
use BunqWeb\Repository\BunqWebRepository;
use Silex\Provider\FormServiceProvider;

require_once __DIR__ . '/bootstrap.php';

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\TwigServiceProvider, array(
    'twig.path' => RESOURCES_PATH . '/views',
));

$app->register(new ConfigServiceProvider);
$app->register(new BunqServiceProvider);
$app->register(new RepositoryServiceProvider);

$app->mount('/', new DashboardControllerProvider);

return $app;
