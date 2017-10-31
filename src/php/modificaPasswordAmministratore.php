<?php
    include 'classes/DatabaseConnection.php';
    header("Access-Control-Allow-Origin: *");

    $post = json_decode(file_get_contents('php://input'), true);
    $id = $post['id'];
    $password = $post['password'];


    $db = new DatabaseConnection();
    $db->connect();


    $query = $db->executeQuery("UPDATE amministratore SET password='$password' WHERE id='$id'");
