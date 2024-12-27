import { UserCardTypes } from "@/app/components/UserCard/UserCard.types";
import { StarCardTypes } from "@/app/components/StarCard/StarCard.types";

export interface FormFieldProps {
  name: string;
  placeholder?: string;
  type?: "text" | "select" | "checkbox" | "password";
  options?: { value: string; label: string }[];
  className?: string;
  label?: string;
  labelStyle?: string;
  defaultValue?: string;
}

export interface UserDataResponse {
  thienban: UserCardTypes;
  diaban: {
    thangSinhAmLich: number;
    gioSinhAmLich: number;
    thapNhiCung: StarCardTypes[];
    cungThan: number;
    cungMenh: number;
    cungNoboc: number;
    cungTatAch: number;
  };
}
