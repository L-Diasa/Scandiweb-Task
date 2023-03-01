<?php

class Products extends Dbh {
    public function getProducts() {
        $sql = "SELECT * FROM products ORDER BY id DESC";
        $stmt = $this->connect()->query($sql);
        $table_data = $stmt->fetchAll();
        return $table_data;
    }

    public function deleteProducts($skusArray) {
        foreach ($skusArray as $sku) {
            $sql = "DELETE FROM products WHERE sku = ?";
            $stmt = $this->connect()->prepare($sql);
            $stmt->execute([$sku]);
        }
    }

    public function createProduct($sku, $name, $price, $type, $spec_attr, $spec_attr_val) {
        $sql = "INSERT INTO products (sku, name, price, type, spec_attr, spec_attr_val) VAlUES (?, ?, ?, ?, ?, ?)";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute([$sku, $name, $price, $type, $spec_attr, $spec_attr_val]);
    }

    public function isUniqueSku($sku) {
        $sql = "SELECT * FROM products WHERE sku = ?";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute([$sku]);
        $data = $stmt->fetchAll();
        if(count($data) == 0) {
            return true;
        }
        return false;
    }
}