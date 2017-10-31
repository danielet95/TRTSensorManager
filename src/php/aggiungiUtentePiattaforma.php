<?php
    include 'classes/DatabaseConnection.php';
    header("Access-Control-Allow-Origin: *");

    $post = json_decode(file_get_contents('php://input'), true);
    $nome = $post['nomeUtente'];
    $cognome = $post['cognomeUtente'];
    $username = $post['userUtente'];
    $password = $post['passUtente'];
    $amministratore = $post['idAmministratore'];


    $db = new DatabaseConnection();
    $db->connect();


    $query = $db->executeQuery("INSERT INTO utente (nome, cognome, username, password, amministratore)
                                  VALUES ('$nome', '$cognome', '$username', '$password', '$amministratore')");
