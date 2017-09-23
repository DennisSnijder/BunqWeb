<?php
namespace BunqWeb\Provider\Service;


use BunqWeb\Exception\ConfigFileDoesNotExistsException;
use Pimple\Container;
use Pimple\ServiceProviderInterface;
use Symfony\Component\Yaml\Yaml;

class ConfigServiceProvider implements ServiceProviderInterface
{
    /**
     * {@inheritdoc}
     */
    public function register(Container $pimple)
    {
        $pimple['config'] = function() {
            if(!file_exists(CONFIG_PATH . '/config.yml')) {
                throw new ConfigFileDoesNotExistsException();
            }

            $file = file_get_contents(CONFIG_PATH . '/config.yml');
            return Yaml::parse($file);
        };
    }
}