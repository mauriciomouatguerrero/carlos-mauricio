<?php
   //print "Welcome to getmydata... (PHP 7.4)";
   //$array = array(
   //   'nombre' => "mauricio",
   //   'telefono' => "+56965474096"
   //);
   //print json_encode($array);

   $array_input = array(
   	   "cadena" => $_POST['cadena']
   );

   print json_encode($array_input);
?>