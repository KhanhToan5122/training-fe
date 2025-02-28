import { useState, useEffect } from "react";
import ProductForm from "@/components/ui/DataForm/ProductForm.tsx";
import { updateProduct, fetchProductById } from "@/api/products";
import { Products } from "@/types/products";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    fetchProductById(id)
      .then((data) => {
        console.log("Fetched product data:", data); // Log to verify data
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (formData: FormData) => {
    if (!id) return;

    try {
      await updateProduct(id, formData);
      alert("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Update Product</h1>
      <ProductForm
        initialData={product}
        onSubmit={handleUpdate}
        submitLabel="Update Product"
      />
    </div>
  );
}

export default UpdateProductPage;