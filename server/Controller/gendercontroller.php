<?php
require_once("Dao/genderdao.php");
class GenderController{
   static function get(){
       $genders = GenderDao::getAll();
       $jsonData = json_encode($genders);
       echo $jsonData;
   }
}



?>