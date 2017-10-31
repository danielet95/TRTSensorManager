<?php
    include 'classes/DatabaseConnection.php';
    header('Access-Control-Allow-Origin: *');

    $post = json_decode(file_get_contents('php://input'), true);
    $codice = $post['codice'];
    $visibilita = $post['visibilita'];

    $db = new DatabaseConnection();
    $db->connect();

    if (isset($post['codice']) && $post['codice']!= null){

      $query = $db->executeQuery("UPDATE sensore SET aggiuntoDashboardAmministratore = '$visibilita' WHERE codice = '$codice' ");

    }
