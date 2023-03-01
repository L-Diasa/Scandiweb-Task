<?php

class Furniture extends Product {
    private $height, $width, $length;

    public function __construct($sku, $name, $price, $type, $height, $width, $length)
    {
        parent::__construct($sku, $name, $price, $type);
        $this->spec_attr = "Dimensions";
        $this->height = $height;
        $this->width = $width;
        $this->length = $length;
    }

    public function getSpecAttrVal() {
        $height = intval($this->height);
        $width = intval($this->width);
        $length = intval($this->length);
        return $height ."x" .$width ."x"  .$length;
    }

    public function getInvalidData() {
        $invalidData = parent::getInvalidData();
        if(!(is_numeric($this->height) && $this->height > 0)) {
            array_push($invalidData, "height");
        }
        if(!(is_numeric($this->width) && $this->width > 0)) {
            array_push($invalidData, "width");
        }
        if(!(is_numeric($this->length) && $this->length > 0)) {
            array_push($invalidData, "length");
        }
        return $invalidData;
    }
}