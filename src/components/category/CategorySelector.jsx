import React, { useState }  from 'react'

const CategorySelector = ({ categories, onSelect }) => {
    let [selectedCategory,setSelectedCategory]=useState('');
    const handleCategoryChange=(e)=>{  
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        onSelect(selectedValue);
    }
  return (
   
         <select
         onChange={handleCategoryChange}
         value={selectedCategory}
    name="msl"
    className=" px-5 flex-none w-auto text-white bg-red-500 border-red-500 border-r-8"
    id="pet-select "
  >
    <option value="">카테고리</option>
{categories.map((category)=>(
    <option key={category.id} value={category.name}> {category.name}</option>
))}
  </select>
 
  )
}

export default CategorySelector