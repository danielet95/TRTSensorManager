<?php
/**
 * Created by IntelliJ IDEA.
 * User: totar
 * Date: 02/09/2017
 * Time: 15:51
 */

class DatabaseConnection
{
    public $servername = 'localhost';
    public $username = 'sensormanager';
    public $password = '';
    public $dbname = 'my_sensormanager';
    private $conn;

    function connect(){
        // Create connection
        $this->conn = new mysqli($this->servername, $this->username, $this->password);

        // Check connection
        if ($this->conn->connect_error) {
            trigger_error('Connection failed');
        } else {

          mysqli_select_db($this->conn, $this->dbname);

        }
    }

    function executeQuery($query) {
        return $this->conn->query($query);
    }
}
