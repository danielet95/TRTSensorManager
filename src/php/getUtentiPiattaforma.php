<?php
    include 'classes/DatabaseConnection.php';
    header('Access-Control-Allow-Origin: *');

    $post = json_decode(file_get_contents('php://input'), true);
    $amministratore = $post['idAmministratore'];

    $db = new DatabaseConnection();
    $db->connect();


    $result = $db->executeQuery("SELECT * FROM utente WHERE amministratore = '$amministratore'");

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
