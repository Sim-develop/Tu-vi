"use client";

import { formSchema } from "@/app/components/HeadingForm/UserForm/UserForm.validation";
import { fields } from "@/app/components/HeadingForm/UserForm/constants";
import FormFieldItem from "@/components/Field/Field";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const MainForm = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const defaultValues = useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...defaultValues},
  });

  const createQueryString = useCallback(
    (data: z.infer<typeof formSchema>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(data)) {
        params.set(key, value?.toString());
      }
      return params.toString();
    },
    [searchParams]
  );

  const { handleSubmit, control, setValue } = form;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const queryString = createQueryString(data);
      router.push(`${pathname}?${queryString}`);
      // const response: UserDataResponse = await submitUserInfoForm({
      //   ...data,
      //   gender: data.gender === "Nữ" ? "0" : "1",
      //   duongLich: !data.isLunar,
      // });
      // setUserData(response);
      // setSearchUserData(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full m-5 max-w-2xl">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-3 sm:gap-x-14 sm:gap-y-8 mx-auto">
            {fields.map((item) => (
              <FormField
                key={item.name}
                name={item.name as keyof z.infer<typeof formSchema>}
                control={control}
                render={({ field }) => (
                  <FormFieldItem
                    item={{ ...item, type: item.type }}
                    value={field.value || ""}
                    onChange={field.onChange}
                    className="bg-white "
                    setValue={setValue}
                  />
                )}
              />
            ))}
          </div>
          <div className="flex w-full justify-center mt-4">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MainForm;
