function FormFieldError({ error }: { error: string }) {
  return <small className="text-red-500 text-[12px] leading-relaxed">{error}</small>;
}
export default FormFieldError;
