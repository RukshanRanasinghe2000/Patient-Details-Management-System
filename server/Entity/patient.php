<?php

    class patient{

        public $id;
        public $name;
        public $gender;
        public $email;
        public $mobile;
        public $nic;

        function __construct(){}

        function getId(){ return $this->id;}
        function setId($id){ $this->id = $id;}

        function getName(){ return $this->name;}
        function setName($name){ $this->name = $name;}

        function getEmail(){ return $this->email;}
        function setEmail($email){ $this->email = $email;}

        function getMobile(){ return $this->mobile;}
        function setMobile($mobile){ $this->mobile = $mobile;}

        function getNic(){ return $this->nic;}
        function setNic($nic){ $this->nic = $nic;}

        function getGender(){ return $this->gender;}
        function setGender($gender){ $this->gender = $gender;}



    }



?>