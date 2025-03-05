import { useEffect, useMemo } from "react";
import ProductForm from "@/components/features/products/ProductForm";
import { updateProduct, fetchProductById } from "@/api/products";
import { FormProductParams, formProductSchemas, Products } from "@/types/products";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import FormContainer from "@/components/ui/DataForm/FormContainer";

function UpdateProductPage() {
  const { id } = useParams<{ id: string }>();
  
  const navigate = useNavigate();
  const {
    isLoading: loading,
    data: product,
    error,
  } = useQuery<Products>({
    queryKey: ["product", "detail", id],
    queryFn: () => {
      return fetchProductById(id as string);
    },
    enabled: !!id,
  });

  const {mutateAsync, isPending} = useMutation({
    mutationFn: (params: FormData) => {
        return updateProduct(id as string, params)
    },
    onSuccess: () => {
        navigate('/products')
    },
    onError: (err) => {
        console.log(err);
    }
  })

  useEffect(() => {
    if (error) console.log("Error", error);
  }, [error]);

  const handleUpdate = (data: FormProductParams) => {
    const formData = new FormData()
    Object.keys(data).forEach((key: string) => {
        if (data[key as keyof typeof data])
        formData.append(key, String(data[key as keyof typeof data]))
    })
    
    mutateAsync(formData);
  };

  const initValues = useMemo<FormProductParams | undefined>(() => {
    if (!product) return undefined

    return {
        name: product.name,
        description: product.description,
        sku: product.sku,
        price: product.price
    }
  }, [product])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Update Product</h1>
      {/* <ProductForm
        initialData={product}
        onSubmit={handleUpdate}
        submitLabel="Update Product"
      /> */}

      <FormContainer
        isPending={isPending || loading}
        onSubmit={handleUpdate}
        schemas={formProductSchemas}
        initValues={initValues}
      >
        <ProductForm/>
      </FormContainer>
    </div>
  );
}

export default UpdateProductPage;
