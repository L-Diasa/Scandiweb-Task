<?php

class DVD extends Product {
    private $size;

    public function __construct($sku, $name, $price, $type, $size)
    {
        parent::__construct($sku, $name, $price, $type);
        $this->spec_attr = "Size";
        $this->size = $size;
    }
    
    public function getSpecAttrVal() {
        $value = $this->size;
        $precision = 2;
        if (!filter_var($value, FILTER_VALIDATE_INT)) {
            $value = sprintf("%.{$precision}f", $value);
        } 
        return $value ." MB";
    }

    public function getInvalidData() {
        $invalidData = parent::getInvalidData();
        if(!(is_numeric($this->size) && $this->size > 0)) {
            array_push($invalidData, "size");
        }
        return $invalidData;
    }
}