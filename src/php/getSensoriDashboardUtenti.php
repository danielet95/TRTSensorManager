<?php
    include 'classes/DatabaseConnection.php';
    header('Access-Control-Allow-Origin: *');

    $post = json_decode(file_get_contents('php://input'), true);
    $utente = $post['idUtente'];


    $db = new DatabaseConnection();
    $db->connect();

    $result = $db->executeQuery("SELECT * FROM sensore INNER JOIN sensore_utente ON sensore.codice = sensore_utente.sensore
                                       WHERE utente = '$utente'");

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
                'aggiuntoDashboardUtente' => $row['aggiuntoDashboardUtente'] == 1 ? true : false,
                'amministratore' => $row['amministratore']
            );
        }
    }

    echo json_encode($array);
