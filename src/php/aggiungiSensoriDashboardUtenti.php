<?php
    include 'classes/DatabaseConnection.php';
    header('Access-Control-Allow-Origin: *');

    $post = json_decode(file_get_contents('php://input'), true);
    $id = $post['idUtente'];
    $codice = $post['codice'];

    $db = new DatabaseConnection();
    $db->connect();

//    if (isset($post['codice']) && $post['codice']!= null){


        $query = $db->executeQuery("INSERT INTO sensore_utente (sensore, utente)
                                 VALUES ($codice, $id)");

//    }
