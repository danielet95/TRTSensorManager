<?php
    include 'classes/DatabaseConnection.php';
    header("Access-Control-Allow-Origin: *");

    $post = json_decode(file_get_contents('php://input'), true);
    $codice = $post['codice'];
    $amministratore = $post['idAmministratore'];

    $db = new DatabaseConnection();
    $db->connect();

//    if ($post != null && isset($post['codice'])){

        $query = $db->executeQuery("UPDATE sensore SET aggiuntoPiattaforma = 1, amministratore = '$amministratore' WHERE codice = '$codice' AND amministratore IS NULL ");

//    }
