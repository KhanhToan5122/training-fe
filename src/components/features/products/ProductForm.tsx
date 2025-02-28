import FormInputControl from "../../ui/DataForm/FormInputControl";

function ProductForm() {
  return (
    <>
      <FormInputControl isRequired name="name" label="Name" placeholder="name" />

      <FormInputControl
        name="description"
        label="Description"
        placeholder="Description"
      />

      <FormInputControl name="sku" isRequired label="Sku" placeholder="Sku" />

      <FormInputControl
        name="price"
        label="Price"
        isRequired
        placeholder="Price"
        type="number"
      />
    </>
  );
}

export default ProductForm;
