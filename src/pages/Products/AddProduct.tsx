import ProductForm from "@/components/ui/DataForm/ProductForm.tsx";
import { createProduct } from "@/api/products"; // Make sure this import is correct
// import { FormData } from "react"; // If FormData type needs to be explicitly imported

function CreateProductPage() {
  const handleSubmit = async (formData: FormData) => {
    try {
      await createProduct(formData); // Assuming createProduct takes FormData
      console.log("Product created successfully");
    } catch (error) {
      console.error("Error creating product:", error);
      throw error; // Re-throw to be caught by ProductForm's try-catch
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      <ProductForm onSubmit={handleSubmit} submitLabel="Create Product" />
    </div>
  );
}

export default CreateProductPage;