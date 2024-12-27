import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { FormFieldProps } from "@/components/Field/Field.types";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/app/components/HeadingForm/UserForm/UserForm.validation";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

const FormFieldItem = ({
  item,
  value,
  onChange,
  className,
  setValue,
}: {
  item: FormFieldProps;
  value?: string | number | boolean;
  onChange: (value: never) => void;
  className?: string;
  setValue: UseFormSetValue<z.infer<typeof formSchema>>;
}) => {
  const renderUIComponent = (item: FormFieldProps) => {
    switch (item.type) {
      case "text":
      case "password":
        return (
          <FormControl>
            <Input
              type={item.type}
              {...item}
              onChange={onChange}
              value={value?.toString() || ""}
              placeholder={item.placeholder}
              className={className}
            />
          </FormControl>
        );
      case "select":
        return (
          <Select onValueChange={onChange} value={value?.toString()}>
            <FormControl>
              <SelectTrigger className={cn(className)}>
                <SelectValue placeholder={item.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {item.options?.map(
                (option: {
                  value: string | number;
                  label: string | number;
                }) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        );
      case "combobox":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !value && "text-muted-foreground"
                  )}
                >
                  {value
                    ? item.options?.find((option) => option.value.toString() === value)
                        ?.label
                    : "Select value"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 z-10">
              <Command>
                <CommandInput placeholder={value?.toString()} />
                <CommandList>
                  <CommandEmpty>Nothing Found</CommandEmpty>
                  <CommandGroup>
                    {item.options?.map((option) => (
                      <CommandItem
                        value={option.label.toString()}
                        key={option.value}
                        onSelect={() =>
                          setValue(
                            item.name as keyof z.infer<typeof formSchema>,
                            option.value.toString()
                          )
                        }
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            option.value.toString() === value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        );
      case "checkbox":
        const checked = value?.toString() === "true"
        return (
          <FormControl>
            <Checkbox onCheckedChange={onChange} checked={checked} className="-translate-y-1"/>
          </FormControl>
        );
      default:
        return null;
    }
  };
  return (
    <FormItem
      className={cn(
        "relative",
        item.type === "checkbox" ? "flex gap-4 items-center p-0" : "",
        item.className
      )}
    >
      {item.label && (
        <FormLabel
          className={cn(
            "text-xs font-semibold px-[6px] text-primary-gray",
            item.labelStyle
          )}
        >
          {item.label}
        </FormLabel>
      )}
      {renderUIComponent(item)}
      <FormMessage  className="absolute top-full"/>
    </FormItem>
  );
};

export default FormFieldItem;
