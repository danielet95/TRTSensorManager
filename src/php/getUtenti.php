<?php
    include 'classes/DatabaseConnection.php';
    header('Access-Control-Allow-Origin: *');

    $db = new DatabaseConnection();
    $db->connect();

    $result = $db->executeQuery("SELECT * FROM utente");

    $array = Array();

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {

            $array[] = Array(
                'id' => $row['id'],
                'nome' => $row['nome'],
                'cognome' => $row['cognome'],
                'username' => $row['username'],
                'password' => $row['password'],
                'amministratore' => $row['amministratore']
            );

        }
    }

echo json_encode($array);
