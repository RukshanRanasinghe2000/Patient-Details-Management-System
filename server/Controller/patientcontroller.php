<?php
require_once("Dao/patientdao.php");

class PatientController{
    static function get()
    {
        $hasName = !empty($_GET['name']);
        $hasGender = !empty($_GET['gender']);

        if ($hasName) {
            $name = $_GET['name'];
        }
        if ($hasGender) {
            $gender = $_GET['gender'];
        }
        $patients = null;
        if (!$hasName && !$hasGender) $patients = PatientDao::getAll();
        if ($hasName && !$hasGender) $patients = PatientDao::getbyName($name);
        if (!$hasName && $hasGender) $patients = PatientDao::getbyGender($gender);
        if ($hasName && $hasGender) $patients = PatientDao::getbyNameAndGender($name, $gender);
        $jsonData = json_encode($patients);
        echo $jsonData;
//}
//if ($_SERVER["REQUEST_METHOD"] == 'POST') {
        // $patient = json_decode($_POST["patient"]);
        //  $hasId = !empty($patient->id);
        //  if ($hasId) {
        //     PatientDao::modify($patient);
        // } else {
        // PatientDao::Save($patient);
        // }
    }

    static function post($patient)
    {

        $errors = "";
        if ($patient==null) {
            $errors = "Patient Not Available";
        } else {

            if (!((isset($patient->name)) && (isset($patient->nic)) && (isset($patient->email)) && (isset($patient->mobile)) && (isset($patient->gender)))) {
                $errors = "Patient Data Is Missing..";
            } else {

                if (!preg_match("/^[A-Z][a-z]{2,}$/", $patient->name)) {
                    $errors = $errors . "Name Invalid\n";
                }

                if (!preg_match("/^([0-9]{9}[x|X|V|v]|[0-9]{12})$/", $patient->nic)) {
                    $errors = $errors . "Nic Invalid\n";
                }

                if (!preg_match("/^[a-z0-9]+[@][a-z]+.[a-z]+$/", $patient->email)) {
                    $errors = $errors . "Nic Invalid\n";
                }

                if (!preg_match("/^([0-9]{10})$/", $patient->mobile)) {
                    $errors = $errors . "Mobile Invalid\n";
                }

                if ($patient->gender == null) {
                    $errors = $errors . "Gender Not Selected\n";
                }
            }
            if (!$errors == "") {
                echo($errors);
            } else {
                if (PatientDao::getByNic($patient->nic) !== null) {
                    echo("Nic Is Already Existing!");
                } else {
                    $result = PatientDao::save($patient);
                    if ($result != 1) {
                        echo("DataBase Error!");
                    }
                }
            }
        }

    }

    static function put($id,$patient)
    {


        $errors = "";
        if ($patient==null) {
            $errors = "Patient Not Available";
        } else {


            if (!(isset($patient->id)) && (isset($patient->name)) && (isset($patient->nic)) && (isset($patient->email)) && (isset($patient->mobile)) && (isset($patient->gender))) {
                $errors = "Patient Data Is Missing..";
            } else {

                if (!preg_match("/^[A-Z][a-z]{2,}$/", $patient->name)) {
                    $errors = $errors . "Name Invalid\n";
                }

                if (!preg_match("/^([0-9]{9}[x|X|V|v]|[0-9]{12})$/", $patient->nic)) {
                    $errors = $errors . "Nic Invalid\n";
                }

                if (!preg_match("/^[a-z0-9]+[@][a-z]+.[a-z]+$/", $patient->email)) {
                    $errors = $errors . "Nic Invalid\n";
                }

                if (!preg_match("/^([0-9]{10})$/", $patient->mobile)) {
                    $errors = $errors . "Mobile Invalid\n";
                }

                if ($patient->gender == null) {
                    $errors = $errors . "Gender Not Selected\n";
                }
            }
            if ($errors != "") {
                echo($errors);
            } else {

                $paById = PatientDao::getById($id);
                if (!$paById) {
                    echo("Patient Not Found in DB");
                } else {

                    $pa = PatientDao::getByNic($patient->nic);


                    if ($pa != null && $pa->id != $id) {
                        echo("This NIC is already exsist");
                    } else {
                        $patient->id = $id;
                        $result = PatientDao::modify($patient);
                        if ($result != 1) {
                            echo("Database Error");
                        }
                    }
                }

            }
        }
    }

    static function delete($id)
    {

        $errors = "";
        $patient = PatientDao::getById($id);
        if (!$patient){
            $errors = "Patient Not Available";
        } else {
//            $patitent = json_decode($_POST['patient']);
            $result = PatientDao::deletePatient($id);
            if ($result != 1) {
                echo("Database Error");
            }
        }
        echo $errors;
    }
}

