<?php
    include 'classes/DatabaseConnection.php';
    header("Access-Control-Allow-Origin: *");

    $post = json_decode(file_get_contents('php://input'), true);
    $id = $post['id'];

    $db = new DatabaseConnection();
    $db->connect();

    if(isset($post['id']) && $post['id']!= null){

      $query = $db->executeQuery("DELETE FROM utente WHERE id='$id'");

    }
