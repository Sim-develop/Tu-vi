"use client";

import { BatQuaiIconNoBg, ErrorIcon, LoadingIcon } from "@/app/assets/svgs";
import { signInSchema } from "./signin.validation";
import { z } from "zod";
import { DEFAULT_VALUES } from "./constants";
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
import { useState } from "react";
import { signin } from "@/app/auth/signin/actions";

const SignIn = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const [error, setError] = useState<string>("");

  const {
    handleSubmit,
    control,
    formState: { isLoading },
  } = form;

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const { message } = (await signin(values)) ?? {};
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
        <p className="font-bold text-2xl">Đăng nhập</p>
      </div>
      <div className="bg-red-extra-dark w-full flex flex-col items-center">
        <div className="max-w-5xl flex items-center py-14 w-full justify-end">
          <div className="p-[30px] bg-white rounded-[10px] max-w-[400px] w-full flex flex-col gap-[30px]">
            <h1 className="font-semibold text-xl">Đăng nhập</h1>
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
                <div className="flex flex-col items-end">
                  <Button
                    type="submit"
                    className="bg-red-extra-dark h-10 w-full"
                  >
                    {isLoading ? (
                      <LoadingIcon className="animate-spin" />
                    ) : (
                      "Đăng nhập"
                    )}
                  </Button>
                  <Link href={"/"} className="text-xs my-[10px]">
                    Quên mật khẩu
                  </Link>
                </div>
              </form>
            </Form>
            <div className="relative">
              <Separator />
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-[#ccc]">
                HOẶC
              </span>
            </div>
            <div className="flex w-full justify-center gap-1">
              <p className="text-sm">Bạn chưa có tài khoản?</p>
              <Link
                href={"/auth/signup"}
                className="text-red-extra-dark text-sm"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
