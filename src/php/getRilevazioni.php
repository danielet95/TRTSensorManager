<?php
    include 'classes/DatabaseConnection.php';
    header('Access-Control-Allow-Origin: *');

    $post = json_decode(file_get_contents('php://input'), true);
    $codiceSensore = $post['codiceSensore'];


    $db = new DatabaseConnection();
    $db->connect();


    $result = $db->executeQuery("SELECT * FROM rilevazione WHERE codiceSensore = '$codiceSensore'");


    $array = array();

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {

            $array[] = array(
                'rilevazione' => $row['rilevazione'],
                'codiceSensore' => $row['codiceSensore']
            );
        }
    }

    echo json_encode($array);
