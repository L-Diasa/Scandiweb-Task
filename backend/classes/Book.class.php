<?php

class Book extends Product {
    private $weight;

    public function __construct($sku, $name, $price, $type, $weight)
    {
        parent::__construct($sku, $name, $price, $type);
        $this->spec_attr = "Weight";
        $this->weight = $weight;
    }

    public function getSpecAttrVal() {
        $value = $this->weight;
        $precision = 2;
        if (!filter_var($value, FILTER_VALIDATE_INT)) {
            $value = sprintf("%.{$precision}f", $value);
        } 
        return $value ." KG";
    }

    public function getInvalidData() {
        $invalidData = parent::getInvalidData();
        if(!(is_numeric($this->weight) && $this->weight > 0)) {
            array_push($invalidData, "weight");
        }
        return $invalidData;
    }
}