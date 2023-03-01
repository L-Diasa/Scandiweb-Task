<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");

include "helpers.php";

$productsObject = new Products();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $data = $productsObject->getProducts();
        echo json_encode($data);
        break;

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        $actualMethod = $input['reqMethod'];
        
        if($actualMethod == 'POST') {
            $newProduct = $input['productToAdd'];
            if($productsObject->isUniqueSku($newProduct['sku'])) {
                $productName = $newProduct['type'];
                if(class_exists($productName)) {
                    $values = array();
                    foreach ($newProduct as $key => $value) {
                        $values[] = $value;
                    }
                    $product = new $productName(...$values);
                    $invalidData = $product->getInvalidData();
                    if(count($invalidData) > 0) {
                        http_response_code(403);
                        echoInvalidData($invalidData);
                    } else {
                        $productsObject->createProduct(
                            strval($product->getSku()), 
                            $product->getName(), 
                            $product->getPrice(),
                            $product->getType(), 
                            $product->getSpecAttr(), 
                            strval($product->getSpecAttrVal())
                        );
                    }
                } else {
                    http_response_code(403);
                    echoInvalidData(['type']);
                }
            } else { 
                http_response_code(403);
                echoInvalidData(['sku']);
            }
        } else if($actualMethod == 'DELETE')  {
            $productsObject->deleteProducts($input['skusToDelete']);
        }
        break;
        
    // case 'DELETE':
    //     $productsToDelete = json_decode(file_get_contents("php://input"), true);
    //     $productsObject->deleteProducts($productsToDelete);
    //     break;

    default:
        break;
}