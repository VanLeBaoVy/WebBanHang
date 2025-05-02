<?php
class DatabasePermission
{
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'webbanhang';
    private $connection;

    public function __construct()
    {
        $this->connect();
    }

    private function connect()
    {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
    }

    public function getConnection()
    {
        return $this->connection;
    }

    public function closeConnection()
    {
        if ($this->connection) {
            $this->connection->close();
        }
    }
    public function getAllPermissions()
    {
        $sql = "SELECT * FROM webbanhang.permissions";
        $result = $this->connection->query($sql);
        $permissions = [];

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $permissions[] = $row;
            }
            return $permissions;
        } else {
            return null;
        }
    }
}
