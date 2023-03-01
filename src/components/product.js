import { useState } from "react";

export default function Product({ 
    sku, name, price, spec_attr, spec_attr_val, 
    isSelected, removeFromSelected, addToSelected
}) {
    const [selected, setSelected] = useState(isSelected)

    function handleClick(event) {
        if(event.target.checked) {
            setSelected(true)
            addToSelected(sku)
        } else { 
            setSelected(false)
            removeFromSelected(sku)
        }
    } 

    return (
        <div className="product">
            <input 
                type="checkbox" 
                onChange={handleClick}
                checked={selected}
                className="delete-checkbox"
            />
            <div className="product-details">
                {sku}
                <br/>
                {name}
                <br/>
                {`${parseFloat(price).toFixed(2)} $`}
                <br/>
                {`${spec_attr}: ${spec_attr_val}`}
                <br/>
            </div>
        </div>
    );
}
