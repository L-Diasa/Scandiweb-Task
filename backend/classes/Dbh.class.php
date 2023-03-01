<?php

class Dbh {
    private $host = "localhost";
    private $user = "id20279641_root";
    private $pwd = "";
    private $dbName = "id20279641_scandiweb_task";

    protected function connect() {
        $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbName;
        $pdo = new PDO($dsn, $this->user, $this->pwd);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    }
}