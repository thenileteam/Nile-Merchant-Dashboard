import { useState, useEffect } from "react";
import { useFetchProducts } from "../../datahooks/products/productshooks";
import { toast } from "sonner";

const SelectProduct = ({ cart, setCart }) => {
  const { data, isFetching, isError } = useFetchProducts();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChange = (event) => {
    const productId = event.target.value;
    const product = products.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const addProductToCart = () => {
    if (!selectedProduct) {
      toast.error("Please select a product.");
      return;
    }
    setCart([...cart, { ...selectedProduct, quantity: 1 }]);
    setSelectedProduct(null);
    setSearchTerm("");
    toast.success("Product added to cart!");
  };

  return (
    <div className="w-full max-w-sm ">
      <label className="block text-gray-700 font-bold mb-2">Select Product</label>
      <input
        type="text"
        className="w-full p-2 border rounded-md mb-2"
        placeholder="Search Product"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="w-full p-2 border rounded-md"
        onChange={handleSelectChange}
        value={selectedProduct ? selectedProduct.id : ""}
      >
        <option value="">-- Select a product --</option>
        {filteredProducts.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <button
        className="w-full mt-3 bg-green-600 text-white p-2 rounded-md"
        onClick={addProductToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default SelectProduct;