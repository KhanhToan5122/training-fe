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
    status: initialData?.status === 1, 
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
      if (field === "is_active" || field === "status") {
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
          status: false,
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w mx-auto">

      <div className="flex items-center justify-between pt-6 ">
        <label className="text-base font-semibold text-gray-600">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-[80%] p-2 rounded border"
        //   required
        />
      </div>

      <div className="flex items-center justify-between pt-6 ">
        <label className="text-base font-semibold text-gray-600">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-[80%] border p-2 rounded"
        />
      </div>

      <div className="flex items-center justify-between pt-6 ">
        <label className="text-base font-semibold text-gray-600">SKU</label>
        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleInputChange}
          className="w-[80%] border p-2 rounded"
        //   required
        />
      </div>

      <div className="flex items-center justify-between pt-6 ">
        <label className="text-base font-semibold text-gray-600">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-[80%] border p-2 rounded"
          step="100"
        //   required
        />
      </div>

      <div className="flex items-center justify-between pt-6 ">
        <div className="flex items-center gap-4">
        <label className="text-base font-semibold text-gray-600">Status (0 or 1)</label>
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.checked }))}
          className=""
        //   required
        />
        </div>
        <div className="flex items-center w-[95px] gap-4">
        <label className="text-base font-semibold text-gray-600">Is Active</label>
        <input
          type="checkbox"
          name="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData((prev) => ({ ...prev, is_active: e.target.checked }))}
          className=""
        />
        </div>
      </div>

      <div className="flex items-center pt-2 justify-between">
        <label className="text-base font-semibold text-gray-600">New Images</label>
        <input
          type="file"
          name="images"
          onChange={handleFileChange}
          className="w-4/5"
          multiple
        />
      </div>

      <div className="">
      <Button type="submit"
              className="text-white bg-blue-400 hover:bg-blue-500 mt-8 self-start"
              >{submitLabel}</Button>
      </div>
    </form>
  );
}

export default ProductForm;