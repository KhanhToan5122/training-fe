import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import { Products } from "@/types/products";

interface ProductFormProps {
  initialData?: Products;
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel?: string;
}

function ProductForm({ initialData, onSubmit, submitLabel = "Submit" }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    sku: initialData?.sku || "",
    price: initialData?.price?.toString() || "",
    status: initialData?.status?.toString() || "1",
    is_active: initialData?.is_active === 1, // Normalize 0 | 1 to boolean
    images: [] as File[],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(files),
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    const fields: (keyof typeof formData)[] = ["name", "description", "sku", "price", "status", "is_active"];
    fields.forEach((field) => {
      const value = formData[field];
      if (field === "is_active") {
        data.append(field, value ? "1" : "0"); // Convert boolean to 0 | 1
      } else if (value !== undefined && value !== null) {
        data.append(field, value as string);
      }
    });

    formData.images.forEach((image) => {
      data.append("images[]", image);
    });

    try {
      await onSubmit(data);
      if (!initialData) { // Reset only for create mode
        setFormData({
          name: "",
          description: "",
          sku: "",
          price: "",
          status: "1",
          is_active: false,
          images: [],
        });
      }
    } catch (error) {
      console.error(`Failed to ${initialData ? "update" : "create"} product:`, error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <div className="bg-white">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        //   required
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">SKU</label>
        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        //   required
        />
      </div>

      <div>
        <label className="block mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          step="0.01"
        //   required
        />
      </div>

      <div>
        <label className="block mb-1">Status (0 or 1)</label>
        <input
          type="number"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          min="0"
          max="1"
        //   required
        />
      </div>

      <div>
        <label className="block mb-1">Is Active</label>
        <input
          type="checkbox"
          name="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData((prev) => ({ ...prev, is_active: e.target.checked }))}
          className="border p-2 rounded"
        />
      </div>

      {initialData?.images && initialData.images.length > 0 && (
        <div className="mb-4">
          <label className="block mb-1">Current Images</label>
          <div className="flex gap-2">
            {initialData.images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Product image ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block mb-1">New Images</label>
        <input
          type="file"
          name="images"
          onChange={handleFileChange}
          className="w-full"
          multiple
        />
      </div>

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}

export default ProductForm;