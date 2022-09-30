<?php

include_once "Controller/patientcontroller.php";
include_once "Controller/gendercontroller.php";

$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

$resource =  explode('?',(explode('/',$request)[3]))[0]; ;

$output = null;

switch ($resource){
    case "patients":
        switch ($method){
            case "GET": $output = PatientController::get();
            break;
            case "POST":$output = PatientController::post(getData());
            break;
            case "PUT":$output = PatientController::put(getURLId($request),getData());
            break;
            case "DELETE":$output = PatientController::delete(getURLId($request));
            break;
        }
    break;

    case "genders":
        switch ($method){
            case "GET": $output = GenderController::get();
            break;
            /*case "POST":$output = GenderController::post();
            break;*/
        }
    break;
}
echo($output);


function getURLId($request){
    if (count(explode('/',$request))>4){
        return explode('/',$request)[4];
    }else{
        die("ID Not Found ");
    }
}

function getData(){
    $jsonFile = fopen('php://input', 'r');
    $jsonString = fread($jsonFile, 1024);
    return json_decode($jsonString);
}

?>