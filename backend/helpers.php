<?php

function echoInvalidData($array) {
    $object = new stdClass();
    $object->invalidData = $array;
    echo json_encode($object);
}

spl_autoload_register('myAutoLoader');
function myAutoLoader($className) {
    $path = 'classes/';
    $extention = '.class.php';
    $fileName = $path . $className . $extention;

    if(!file_exists($fileName)) {
        return false;
    }
    
    include_once $path . $className . $extention;
}