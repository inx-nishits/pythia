function FormFieldError({ error }: { error: string }) {
  return <small className="text-red-60 text-[12px]">{error}</small>;
}
export default FormFieldError;
