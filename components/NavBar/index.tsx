"use client";

import { ArrowDownIcon, BatQuaiIcon } from "@/app/assets/svgs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser } from "./actions";
import { deleteSession } from "@/lib/session";

const NavBar = () => {
  const [name, setName] = useState<string>("");

  const handleSignOut = async () => {
    deleteSession();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUser();
        if (result) {
          setName(result.name ?? "");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-[60px] bg-red-extra-dark flex items-center justify-center fixed top-0 w-full">
      <div className="flex items-center justify-between max-w-5xl w-full">
        <BatQuaiIcon className="w-10 h-10 hover:cursor-pointer" />
        <div className="flex gap-10 items-center">
          <p className="font-sans text-white font-semibold cursor-pointer hover:underline">
            About us
          </p>
          <p className="font-sans text-white font-semibold cursor-pointer hover:underline">
            History
          </p>
        </div>
        {name ? (
          <div className="flex items-center gap-1 group cursor-pointer relative">
            <p className="text-white capitalize font-semibold">{name}</p>
            <ArrowDownIcon className="h-4 w-4 text-white transform transition-transform group-hover:rotate-180" />
            <div className="absolute top-[120%] min-w-full right-0 rounded-[10px] overflow-hidden bg-white shadow-lg scale-y-0 transform transition-all group-hover:opacity-100 group-hover:scale-y-100 flex flex-col items-start">
              <p className="text-nowrap py-3 px-4 hover:bg-red-more-dark/20 w-full text-sm">
                Đổi mật khẩu
              </p>
              <p
                className="text-nowrap py-3 px-4 hover:bg-red-more-dark/20 w-full text-sm"
                onClick={handleSignOut}
              >
                Đăng xuất
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/auth/signin">
              <Button
                variant="outline"
                className="outline-white text-white bg-red-extra-dark rounded-md font-bold font-sans text-md"
              >
                Sign in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                variant="outline"
                className="text-red-extra-dark font-bold font-sans text-md"
              >
                Sign up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
