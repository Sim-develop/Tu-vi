"use client";

import { BatQuaiIconNoBg, ErrorIcon, LoadingIcon } from "@/app/assets/svgs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { DEFAULT_VALUES } from "./constants";
import { signUpSchema } from "./signup.validation";
import { signup } from "./actions";
import { useState } from "react";

const SignUp = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const [error, setError] = useState<string>("");

  const {
    handleSubmit,
    control,
    formState: { isLoading, isValid },
  } = form;

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const { message } = (await signup(values)) ?? {};
    if (message) {
      setError(message);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-5xl w-full h-[84px] flex items-center gap-2">
        <Link href="/">
          <BatQuaiIconNoBg className="w-10 h-10" />
        </Link>
        <p className="font-bold text-2xl">Đăng ký</p>
      </div>
      <div className="bg-red-extra-dark w-full flex flex-col items-center">
        <div className="max-w-5xl flex items-center py-14 w-full justify-end">
          <div className="p-[30px] bg-white rounded-[10px] max-w-[400px] w-full flex flex-col gap-[30px]">
            <h1 className="font-semibold text-xl">Đăng ký</h1>
            {error && (
              <div className="bg-red-100 p-2 text-red-400 text-sm outline-dashed outline-red-400 outline-1 flex items-center gap-2">
                <ErrorIcon className="text-red-400" />
                {error}
              </div>
            )}
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[30px]"
              >
                <FormField
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email/Số điện thoại/Tên đăng nhập"
                          {...field}
                          className="h-10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Mật khẩu"
                          {...field}
                          type="password"
                          className="h-10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="re_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Vui lòng nhập lại mật khẩu"
                          {...field}
                          type="password"
                          className="h-10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-red-extra-dark h-10 w-full"
                  disabled={!isValid}
                >
                  {isLoading ? (
                    <LoadingIcon className="animate-spin" />
                  ) : (
                    "Đăng ký"
                  )}
                </Button>
              </form>
            </Form>
            <div className="relative">
              <Separator />
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-[#ccc]">
                HOẶC
              </span>
            </div>
            <div className="flex w-full justify-center gap-1">
              <p className="text-sm">Bạn đã có tài khoản?</p>
              <Link
                href={"/auth/signin"}
                className="text-red-extra-dark text-sm"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
