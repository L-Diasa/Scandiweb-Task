<?php

abstract class Product {
    protected $sku, $name, $price;
    protected $type, $spec_attr;

    public function __construct($sku, $name, $price, $type) {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->type = $type;
    }

    public function getSku() {
        return $this->sku;
    }

    public function getName() {
        return $this->name;
    }

    public function getPrice() {
        $precision = 2;
        $value = sprintf("%.{$precision}f", $this->price);
        return $value;
    }

    public function getType() {
        return $this->type;
    }

    public function getSpecAttr() {
        return $this->spec_attr;
    }

    abstract protected function getSpecAttrVal();

    public function getInvalidData() {
        $invalidData = [];
        
        if(!(is_numeric($this->price) && $this->price >= 0)) {
            array_push($invalidData, "price");
        }

        if(strpos($this->sku, ' ') !== false || strlen($this->sku) > 20) {
            array_push($invalidData, "sku");
        }

        return $invalidData;
    }
}