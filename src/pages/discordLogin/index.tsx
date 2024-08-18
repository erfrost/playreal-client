"use client";

import { useEffect } from "react";
import axiosInstance from "../../../axios.config";
import { NextRouter, useRouter } from "next/router";
import { AxiosResponse } from "axios";
import { toastError } from "@/lib/toastifyActions";
import { getCookie, setCookie } from "cookies-next";
import { useRecoilState } from "recoil";
import { authIsPendingState } from "@/storage/atoms";

export default function DiscordLogin() {
  const [_, setAuthIsPending] = useRecoilState(authIsPendingState);
  const router: NextRouter = useRouter();

  const handleTokenExchange = async (code: string) => {
    try {
      const role: "user" | "booster" = getCookie("authRole") as
        | "user"
        | "booster";

      setAuthIsPending(true);

      const res: AxiosResponse = await axiosInstance.post(
        "auth/oauth/discord-exchange",
        {
          code,
          role,
        }
      );
      const data = res.data;

      setCookie("access_token", data.access_token);
      setCookie("refresh_token", data.refresh_token);
      setCookie("user_id", data.userId);

      router.push("/");
    } catch (error: any) {
      console.log(error);
      toastError("При авторизации произошла ошибка");
    } finally {
      setAuthIsPending(false);
    }
  };

  useEffect(() => {
    const code: string | undefined = window.location.search
      .split("code")[1]
      .substring(1);

    handleTokenExchange(code);
  }, []);

  return <div></div>;
}
