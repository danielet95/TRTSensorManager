<?php
    include 'classes/DatabaseConnection.php';
    header('Access-Control-Allow-Origin: *');

//    $post = json_decode(file_get_contents('php://input'), true);


    $db = new DatabaseConnection();
    $db->connect();

    $result = $db->executeQuery('SELECT * FROM sensore');

    $array = array();

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {

            $array[] = array(
                'codice' => $row['codice'],
                'nome' => $row['nome'],
                'tipo' => $row['tipo'],
                'dataCreazione' => $row['dataCreazione'],
                'aggiuntoPiattaforma' => $row['aggiuntoPiattaforma'],
                'aggiuntoDashboardAmministratore' => $row['aggiuntoDashboardAmministratore'] == 1 ? true : false,
                'amministratore' => $row['amministratore']
            );
        }
    }

    echo json_encode($array);
