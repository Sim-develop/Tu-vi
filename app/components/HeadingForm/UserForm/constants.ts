import { FormFieldProps } from "@/components/Field/Field.types";
import { generateArray } from "@/lib/utils";

export const fields: FormFieldProps[] = [
  {
    label: "Họ và tên",
    placeholder: "Họ và tên",
    name: "name",
    type: "text",
  },
  {
    label: "Giới tính",
    placeholder: "Giới tính",
    name: "gender",
    type: "select",
    options: [
      { value: "Nam", label: "Nam" },
      { value: "Nữ", label: "Nữ" },
    ],
  },
  {
    label: "Ngày sinh",
    placeholder: "Ngày sinh",
    name: "day",
    type: "select",
    options: generateArray(1, 31).map((day) => ({
      value: day,
      label: day,
    })),
    className: "col-start-1",
  },
  {
    label: "Tháng sinh",
    placeholder: "Tháng sinh",
    name: "month",
    type: "select",
    options: generateArray(1, 12).map((month) => ({
      value: month,
      label: month,
    })),
  },
  {
    label: "Năm sinh",
    placeholder: "Năm sinh",
    name: "year",
    type: "combobox",
    options: generateArray(1900, new Date().getFullYear()).map((year) => ({
      value: year,
      label: year,
    })),
  },
  {
    label: "Giờ sinh",
    placeholder: "Giờ sinh",
    name: "hour",
    type: "select",
    options: generateArray(0, 23).map((hour) => ({
      value: hour,
      label: hour,
    })),
  },
  {
    label: "Phút sinh",
    placeholder: "Phút sinh",
    name: "mins",
    type: "select",
    options: generateArray(0, 59).map((minute) => ({
      value: minute,
      label: minute,
    })),
  },
  {
    label: "Năm xem",
    placeholder: "Năm xem",
    name: "viewedYear",
    type: "combobox",
    options: generateArray(1900, new Date().getFullYear()).map((year) => ({
      value: year,
      label: year,
    })),
  },
  {
    label: "Xem theo lịch âm",
    name: "isLunar",
    type: "checkbox",
    className: "col-start-1 h-fit col-span-3",
    labelStyle: `font-medium text-xs sm:text-base px-0`,
  },
];
