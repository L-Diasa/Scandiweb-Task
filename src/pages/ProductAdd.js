import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { endpoint, specifics } from '../info';
import Header from '../components/Header';
import SpecInput from '../components/SpecInput';
import { MissingValueError,  InvalidDataError } from '../components/Errors';

export default function ProductAdd() {
    const [product, setProduct] = useState({
        sku: "",
        name: "",
        price: "",
        type: ""
    })
    const [productSpecs, setProductSpecs] = useState(null)
    const [missingErrors, setMissingErrors] = useState({})
    const [invalidErrors, setInvalidErrors] = useState({})
    const navigate = useNavigate()

    const specOptions = Object.keys(specifics).map(type => 
        <option value={type} key={type}>{type}</option>
    )

    const specInputs = specifics[product.type] ? 
        Object.keys(specifics[product.type].attributes)
        .map(attribute => 
            <SpecInput 
                key={attribute}
                attribute={attribute} 
                value={productSpecs[attribute]}
                valueType={specifics[product.type].valueType}
                handleSpecsChange={handleSpecsChange}
                missingError={missingErrors[attribute]}
                invalidError={invalidErrors[attribute]}
            />
        ) : null 

    function handleGeneralChange(event) {
        setProduct(prevData => {
            return {
                ...prevData, 
                [event.target.name]: event.target.value
            }
        })
    }

    function handleSpecsChange(event) {
        setProductSpecs(prevData => {
            return {
                ...prevData, 
                [event.target.name]: event.target.value
            }
        })
    }

    function handleTypeChange(event) {
        handleGeneralChange(event)
        setProductSpecs(specifics[event.target.value].attributes);
    }

    async function save() {
        const formInfo = {...product, ...productSpecs}
        const formIsFilled = Object.values(formInfo).every((value) => value)
        if(formIsFilled) {
            setMissingErrors({})
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productToAdd: formInfo,
                    reqMethod: "POST"
                }),
            })
            if (response.ok) {
                setInvalidErrors({})
                navigate('/')
            } else if(response.status === 403) {
                response.json()
                .then(data => {
                    const invalidInputs = {}
                    data.invalidData.forEach(input => invalidInputs[input] = true)
                    setInvalidErrors(invalidInputs)
                })
            }
        } else {
            const notFilledInputs = {}
            Object.keys(formInfo).forEach(key => {
                if (!formInfo[key]) {
                    notFilledInputs[key] = true
                }
            })
            setMissingErrors(notFilledInputs)
        }
    }

    return (
    <div>
        <Header 
            pagename="Product Add" 
            buttons= {
                <div className="header-buttons">
                    <button onClick={save}>Save</button>
                    <Link to="/">Cancel</Link>
                </div>
            }
        />
        <form id="product_form">
            <label htmlFor="sku">SKU
                <input 
                    type="text" 
                    onChange={handleGeneralChange}
                    name="sku"
                    id="sku"
                    value={product.sku}
                    autoComplete="off"
                />
                {missingErrors.sku && <MissingValueError />}
                {invalidErrors.sku && <InvalidDataError />}
            </label>

            <label htmlFor="name">Name
                <input 
                    type="text" 
                    onChange={handleGeneralChange}
                    name="name"
                    id="name"
                    value={product.name}
                    autoComplete="off"
                />
                {missingErrors.name && <MissingValueError />}
                {invalidErrors.name && <InvalidDataError />}
            </label>

            <label htmlFor="price">Price($)
                <input 
                    type="number" 
                    onChange={handleGeneralChange}
                    name="price"
                    id="price"
                    value={product.price}
                    autoComplete="off"
                /> 
                {missingErrors.price && <MissingValueError />} 
                {invalidErrors.price && <InvalidDataError />}
            </label>  

            <label htmlFor="productType">Type Switcher
                <select 
                    name="type" 
                    id="productType"
                    value={product.type}
                    onChange={handleTypeChange}
                >
                    <option value="" disabled></option>
                    {specOptions}
                </select>
                {missingErrors.type && <MissingValueError />}
                {invalidErrors.type && <InvalidDataError />} 
            </label>  
        
            {specifics[product.type] && 
            <div>
                {specInputs}
                <div className='description'>{specifics[product.type].description}</div>
            </div>
            }
        </form>
    </div>
    );
}
