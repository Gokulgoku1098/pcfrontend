import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../server/serice";

function ProductSection() {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [form, setForm] = useState({
        name: "",
        price:199 ,
        category: "",
        brand: "",
        stock:10 ,
        specs: "",
        img:"",
    });
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await getProducts(token);
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddOrEdit = async () => {
        try {
            if (editProduct) {
                await updateProduct(editProduct._id, form, token);
                setEditProduct(null);
            } else {
                await addProduct({
                    name: form.name,
                    price: form.price,
                    category: form.category,
                    brand: form.brand,
                    stock: form.stock,
                    specs: form.specs,
                    img: form.img
                }, token);
            }
            setForm({ name: "", price: "", category: "", img: "" });
            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        await deleteProduct(id, token);
        fetchProducts();
    };

    const handleEditClick = (product) => {
        setEditProduct(product);
        setForm({ name: product.name, price: product.price, category: product.category, img: product.img });
    };

    return (
        <div className="mt-4">
            {/* Add/Edit Form */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mt-4 shadow-lg">
                <h2 className="text-xl font-bold mb-6 text-white">{editProduct ? "Edit Product" : "Add Product"}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
                    <input placeholder="Product Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    <input placeholder="Image" value={form.img} onChange={e => setForm({ ...form, img: e.target.value })} />
                    <input placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
                    <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                    <input placeholder="Brand" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
                    <input placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} />
                    <input placeholder="Specs" value={form.specs} onChange={e => setForm({ ...form, specs: e.target.value })} />
                </div>
                <button className="border rounded bg-blue-500 px-4 py-2 text-white
            hover:bg-blue-600 transition w-full md:w-32 m-4" onClick={handleAddOrEdit}>
                    {editProduct ? "Update Product" : "Add Product"}
                </button>
            </div>

            {/* Product List */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h2 className="text-xl font-semibold mb-4 text-white">All Products</h2>
                <table className="w-full text-left text-white">
                    <thead>
                        <tr className="border-b border-gray-500 ">
                            <th className="p-2">Name</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Category</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p._id} className="border-b border-gray-700">
                                <td className="p-2">{p.name}</td>
                                <td className="p-2">₹{p.price}</td>
                                <td className="p-2">{p.category}</td>
                                <td className="p-2">
                                    <button className="btn-small mr-2" onClick={() => handleEditClick(p)}>Edit</button>
                                    <button className="btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductSection;
