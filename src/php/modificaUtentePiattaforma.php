<?php
    include 'classes/DatabaseConnection.php';
    header("Access-Control-Allow-Origin: *");

    $post = json_decode(file_get_contents('php://input'), true);
    $id = $post['id'];
    $nome = $post['nome'];
    $cognome = $post['cognome'];
    $username = $post['username'];


    $db = new DatabaseConnection();
    $db->connect();


    $db->executeQuery("UPDATE utente SET nome='$nome', cognome='$cognome', username='$username' WHERE id='$id'");