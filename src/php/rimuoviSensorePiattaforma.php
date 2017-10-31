<?php
    include 'classes/DatabaseConnection.php';
    header("Access-Control-Allow-Origin: *");

    $post = json_decode(file_get_contents('php://input'), true);
    $codice = $post['codice'];

    $db = new DatabaseConnection();
    $db->connect();

    if (isset($post['codice']) && $post['codice']!= null){

        $db->executeQuery("UPDATE sensore SET aggiuntoPiattaforma = 0, amministratore = NULL WHERE codice = '$codice' ");

    }
