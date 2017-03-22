<?php
namespace BunqWeb\Repository;

use Doctrine\DBAL\Connection;

class BunqWebRepository
{
    /**
     * @var Connection
     */
    private $conn;

    /**
     * BunqWebRepository constructor.
     * @param Connection $connection
     */
    public function __construct(Connection $connection)
    {
        $this->conn = $connection;
    }

    /**
     * get all the Activities
     */
    public function getAll()
    {
        return "";
    }
}