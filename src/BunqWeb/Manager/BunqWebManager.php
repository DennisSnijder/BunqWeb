<?php

namespace BunqWeb\Manager;

use BunqWeb\Repository\BunqWebRepository;

class BunqWebManager
{
    /**
     * @var BunqWebRepository
     */
    private $bunqWebRepository;

    /**
     * AndroidApkWorldManager constructor.
     * @param BunqWebRepository $bunqWebRepository
     */
    public function __construct(BunqWebRepository $bunqWebRepository)
    {

        $this->bunqWebRepository = $bunqWebRepository;
    }

    /**
     * returns the BunqWebRepository
     * @return BunqWebRepository
     */
    public function getBunqWebRepository()
    {
        return $this->bunqWebRepository;
    }

}
