<?php
namespace BunqWeb\Exception;

use Symfony\Component\Security\Acl\Exception\Exception;

class ConfigFileDoesNotExistsException extends Exception
{
    protected $message = 'Could not find config.yml.';
}