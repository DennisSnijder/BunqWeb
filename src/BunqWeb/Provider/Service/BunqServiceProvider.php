<?php
namespace BunqWeb\Provider\Service;

use bunq\Context\ApiContext;
use bunq\Util\BunqEnumApiEnvironmentType;
use Pimple\Container;
use Pimple\ServiceProviderInterface;

class BunqServiceProvider implements ServiceProviderInterface
{
    const API_CONTEXT_FILE = CONFIG_PATH . '/context/context.conf';

    /**
     * {@inheritdoc}
     */
    public function register(Container $pimple)
    {
        $pimple['bunq.api.context'] = function() use ($pimple) {
            if(file_exists(self::API_CONTEXT_FILE)) {
                return ApiContext::restore(self::API_CONTEXT_FILE);
            }

            $environment = $pimple['config']['bunq']['sandbox'] ?
                BunqEnumApiEnvironmentType::SANDBOX() : BunqEnumApiEnvironmentType::PRODUCTION();

            $apiContext = ApiContext::create(
                $environment,
                $pimple['config']['bunq']['api-key'],
                "Bunq Web",
                $pimple['config']['bunq']['ips']
            );

            $apiContext->save(self::API_CONTEXT_FILE);
            return $apiContext;
        };
    }
}