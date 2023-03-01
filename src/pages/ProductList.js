import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Product from '../components/product';
import Header from '../components/Header';
import { endpoint } from '../info';

export default function ProductList() {
  const [data, setData] = useState([])
  const [selectedToDelete, setSelectedToDelete] = useState([])
  const [readyToDelete, setReadyToDelete] = useState(false)

  const products = data.map(item => 
    <Product
        key={item.id}
        {...item}
        isSelected={
          selectedToDelete.includes(item.sku)
        }
        addToSelected={addToSelected}
        removeFromSelected={removeFromSelected}
    /> 
  )

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if(readyToDelete) {
      deleteSelected()
    }
  }, [readyToDelete])
  
  function getData() {
    fetch(endpoint)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => {});
  }

  function addToSelected(sku) {
    setSelectedToDelete(prev => [sku, ...prev])
  }

  function removeFromSelected(skuToRemove) {
    setSelectedToDelete(prevSkus => 
      prevSkus.filter(sku => sku !== skuToRemove)
  )}

  async function deleteSelected()  {
    // const response = await fetch(endpoint, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(selectedToDelete),
    // })
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skusToDelete: selectedToDelete, 
          reqMethod: "DELETE"
        })
    })
    if(response.ok) {
      setSelectedToDelete([])
      getData()
      setReadyToDelete(false)
    }
  }

  function prepareForDeletion() {
    const checkboxes = document.getElementsByClassName('delete-checkbox');
    for (let i=0; i < checkboxes.length;i++){
      if(checkboxes[i].checked) {
        checkboxes[i].checked = false;
        checkboxes[i].click()
      }
    }
    setReadyToDelete(true)
  }

  return (
    <div>
        <Header  
            pagename="Product List"
            buttons= {
                <div className="header-buttons">
                    <Link to="/addproduct">ADD</Link>
                    <button onClick={prepareForDeletion}>MASS DELETE</button>
                </div>
            }
        />
        <div className='products_div'>
          {products}
        </div>
    </div>
  );
}
