<?php

class CommonDao
{


    public static function getResults($query)
    {


        $servername = "localhost";
        $username = "root";
        $password = "1234";
        $database = "hospital";

        // Create connection
        $dbconn = new mysqli($servername, $username, $password, $database);

        // Check connection
        if (!$dbconn) {
            die("Connection failed: " . $dbconn->connect_error);
        }
        return $dbconn->query($query);
    }
}
    