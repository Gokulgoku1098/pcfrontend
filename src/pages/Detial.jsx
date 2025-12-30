import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getproductById } from '../server/serice'

export default function Detial() {
    const [product, setproduct] = useState(null)
    const { id } = useParams()

    // store data
    const loadpro = async () => {
        const res = await getproductById(id)
        setproduct(res.data)
    }
    // load data
    useEffect(() => {
        loadpro()
    }, [id])
    // check pro
    if (!product)
        return <p>Loading......</p>

    return (
       
  <div className="min-h-100 flex items-center justify-center bg-gray-100 p-4">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden">

      {/* Image */}
      <div className="h-56 bg-gray-200 flex items-center justify-center">
        <img
          src={product.img}
          alt={product.name}
          className="h-full object-contain p-4"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h2 className="text-xl font-bold text-gray-800">
          {product.name}
        </h2>

        <p className="text-gray-600">
          Category: <span className="font-medium">{product.category}</span>
        </p>

        <p className="text-gray-600">
          Brand: <span className="font-medium">{product.brand}</span>
        </p>

        <p className="text-gray-600">
          Specs: <span className="font-medium">{product?.specs?.clock}</span>
        </p>

        
        <div className="flex items-center justify-between pt-4">
          <span className="text-2xl font-bold text-green-600">
            ₹{product?.price}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold
              ${
                product?.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {product?.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        
      </div>
    </div>
  </div>
    )
}
