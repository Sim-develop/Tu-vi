export interface FormFieldProps {
  name: string;
  placeholder?: string;
  type?: "text" | "select" | "checkbox" | "password" | "combobox";
  options?: { value: string | number; label: string | number }[];
  className?: string;
  label?: string;
  labelStyle?: string;
}
