<?php
require_once("commondao.php");
require_once("Entity/patient.php");
require_once("genderdao.php");
class PatientDao
{
    public static function getbyName($name)
    {

        $patients = array();
        $query = "SELECT * FROM patient WHERE name like '$name%'";
        $result = CommonDao::getResults($query);
        while ($row = $result->fetch_assoc()) {
            $patient = PatientDao::setdata($row);
            $patients[] = $patient;
        }
        return $patients;
    }

    public static function setdata($row)
    {
        $patient = new Patient();
        $patient->setId($row['id']);
        $patient->setName($row['name']);
        $patient->setNic($row['nic']);
        $patient->setMobile($row['mobile']);
        $patient->setEmail($row['email']);
        $patient->setGender(GenderDao::getById($row['gender_id']));
        return $patient;
    }

    public static function getById($id)
    {
        $query = "SELECT * FROM patient WHERE id = '$id';";
        $result = CommonDao::getResults($query);
        $row = $result->fetch_assoc();
        return PatientDao::setdata($row);
    }

    public static function getbyGender($gender)
    {
        $patients = array();
        $query = "SELECT * FROM patient WHERE gender_id =" . $gender;
        $result = CommonDao::getResults($query);
        while ($row = $result->fetch_assoc()) {
            $patient = PatientDao::setdata($row);
            $patients[] = $patient;
        }
        return $patients;
    }

    public static function getByNic($nic)
    {
        $patient = null;
        $query = "SELECT * FROM patient WHERE nic =" . $nic;
        $result = CommonDao::getResults($query);
        if ($row = $result->fetch_assoc()) {
            $patient = self::setData($row);
        }
        return $patient;

    }


    public static function getByMobile($mobile)
    {
        $patient = null;
        $query = "SELECT * FROM patient WHERE mobile =" . $mobile;
        $result = CommonDao::getResults($query);
        if ($row = $result->fetch_assoc()) {
            $patient = self::setData($row);
        }
        return $patient;

    }


    public static function getbyNameAndGender($name, $gender)
    {
        $patients = array();
        $query = "SELECT * FROM patient where name like '$name%' and gender_id =" . $gender . ";";
        $result = CommonDao::getResults($query);
        while ($row = $result->fetch_assoc()) {
            $patient = PatientDao::setdata($row);
            $patients[] = $patient;
        }
        return $patients;
    }

    public static function getAll()
    {
        $patients = array();
        $query = "SELECT * FROM patient";
        $result = CommonDao::getResults($query);
        while ($row = $result->fetch_assoc()) {
            $patient = PatientDao::setdata($row);
            $patients[] = $patient;
        }
        return $patients;
    }

    public static function Save($data)
    {
        $query = "INSERT INTO patient (name,nic,email,mobile, gender_id) VALUES ('" . $data->name . "','" . $data->nic . "','" . $data->email . "','" . $data->mobile . "','" . $data->gender->id . "')";
        return CommonDao::getResults($query);
    }

    public static function modify($patient)
    {


        $query = "UPDATE patient SET name='" . $patient->name . "',nic=" . $patient->nic . ",email='" . $patient->email . "',mobile='" . $patient->mobile . "',gender_id=" . $patient->gender->id . " WHERE id = " . $patient->id;

        return CommonDao::getResults($query);
    }

    static function deletePatient($id)
    {
        if (PatientDao::getById($id) == null) {
            return "Patient Not Found";
        } else {
            $qurey = "DELETE FROM patient WHERE id =" . $id;

            return CommonDao::getResults($qurey);
        }
    }
}
