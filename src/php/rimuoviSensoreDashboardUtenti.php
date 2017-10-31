<?php
    include 'classes/DatabaseConnection.php';
    header("Access-Control-Allow-Origin: *");

    $post = json_decode(file_get_contents('php://input'), true);
    $codice = $post['codice'];
    $utente = $post['idUtente'];

    $db = new DatabaseConnection();
    $db->connect();

//    if(isset($post['id']) && $post['id']!= null){

        $db->executeQuery("DELETE FROM sensore_utente WHERE sensore='$codice' AND utente='$utente'");

//    }