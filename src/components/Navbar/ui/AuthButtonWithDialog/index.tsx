import PrimaryBtn from "@/components/PrimaryBtn";
import Input from "@/components/ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styles from "./index.module.css";
import Dialog from "@/components/Dialog";
import axiosInstance from "axios.config";
import { AxiosResponse } from "axios";
import { NextRouter, useRouter } from "next/router";
import signUp from "@/api/auth/signUp";
import signIn from "@/api/auth/signIn";
import { useRecoilState } from "recoil";
import { setCookie } from "cookies-next";
import { authIsPendingState } from "@/storage/atoms";
import { UserInfo } from "@/models/User.model";
import getBaseUserInfo from "@/api/users/getBaseUserInfo";

interface AuthButtonWithDialogProps {
  setUser: Dispatch<SetStateAction<UserInfo | null>>;
}
const AuthButtonWithDialog = ({ setUser }: AuthButtonWithDialogProps) => {
  const [_, setAuthIsPending] = useRecoilState<boolean>(authIsPendingState);
  const [windowType, setWindowType] = useState<string>("signIn");
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<"user" | "booster">("user");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const router: NextRouter = useRouter();

  const handleGoogleLogin = async () => {
    setCookie("authRole", role);

    const response: AxiosResponse = await axiosInstance.post(
      "auth/oauth/google-redirect"
    );

    router.push(response.data.url);
  };

  const handleDiscordLogin = async () => {
    setCookie("authRole", role);

    const response: AxiosResponse = await axiosInstance.post(
      "auth/oauth/discord-redirect"
    );

    router.push(response.data.url);
  };

  useEffect(() => {
    setEmail("");
    setNickname("");
    setPassword("");
  }, [windowType]);

  const onSubmit = async () => {
    if (windowType === "signIn") await signIn(email, password, role);
    else await signUp(email, nickname, password, role);

    setUser(await getBaseUserInfo());
  };

  return (
    <>
      <PrimaryBtn
        className={styles.openBtn}
        onClick={() => setIsDialogOpen(true)}
      >
        Log in
      </PrimaryBtn>

      {isDialogOpen && (
        <Dialog
          onClose={() => setIsDialogOpen(false)}
          className={styles.dialog}
        >
          <span className={styles.title}>Log in</span>
          {/* {windowType === "signUp" && ( */}
          <div className={styles.roleSelect}>
            <div
              className={`${styles.roleSelectBtn} ${
                role === "user" && styles.roleActive
              }`}
              onClick={() => setRole("user")}
            >
              Я ищу бустера
            </div>
            <div
              className={`${styles.roleSelectBtn} ${
                role === "booster" && styles.roleActive
              }`}
              onClick={() => setRole("booster")}
            >
              Я бустер
            </div>
          </div>
          {/* )} */}
          <div className={styles.oauth}>
            <div onClick={handleGoogleLogin} className={styles.googleBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 256 262"
                id="google"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                ></path>
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>
              Continue with Google
            </div>
            <button className={styles.discordBtn} onClick={handleDiscordLogin}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"
                id="discord"
                width="16"
                height="16"
                fill="#fff"
                fontWeight={700}
              >
                <path d="M45.23 57.2c-6.16 0-11.17 5.6-11.17 12.48s5 12.47 11.17 12.47 11.16-5.59 11.16-12.47S51.38 57.2 45.23 57.2Zm0 21c-4 0-7.17-3.8-7.17-8.47s3.21-8.48 7.17-8.48 7.16 3.8 7.16 8.48-3.21 8.42-7.16 8.42Z"></path>
                <path d="M121.83 59.58a156.78 156.78 0 0 0-11.52-31 2.1 2.1 0 0 0-.71-.77 87.08 87.08 0 0 0-15.23-7.17C84.55 17.07 79.91 17 79.72 17a2 2 0 0 0-2 1.72l-.6 4.17a133.14 133.14 0 0 0-26.28 0l-.6-4.17a2 2 0 0 0-2-1.72c-.19 0-4.83 0-14.65 3.61a87.08 87.08 0 0 0-15.19 7.2 2.1 2.1 0 0 0-.71.77 156.72 156.72 0 0 0-11.52 31C1 80.46 0 90.91 0 91.34a2 2 0 0 0 .49 1.5 55.2 55.2 0 0 0 18.2 12.74A76.32 76.32 0 0 0 38.48 111a2 2 0 0 0 1.92-1l5.4-9.25a105.08 105.08 0 0 0 18.2 1.49 105.08 105.08 0 0 0 18.2-1.51l5.4 9.27a2 2 0 0 0 1.72 1h.2a76.32 76.32 0 0 0 19.78-5.38 55.2 55.2 0 0 0 18.2-12.74 2 2 0 0 0 .49-1.5c.01-.47-.94-10.92-6.16-31.8Zm-14.06 42.31a76.76 76.76 0 0 1-17.39 4.92l-4.08-7c4.68-1.24 14.42-4.46 21.83-11.2a2 2 0 1 0-2.69-3c-9 8.23-22.46 10.84-22.6 10.87h-.06A96.59 96.59 0 0 1 64 98.24a96.59 96.59 0 0 1-18.78-1.7h-.06c-.14 0-13.55-2.64-22.6-10.87a2 2 0 1 0-2.69 3c7.41 6.74 17.15 10 21.83 11.2l-4.08 7a76.08 76.08 0 0 1-17.39-4.92A52.24 52.24 0 0 1 4.08 90.8c.33-2.91 1.68-13.07 6-30.24A156.25 156.25 0 0 1 21 30.92a88.17 88.17 0 0 1 14-6.52 61.35 61.35 0 0 1 11.58-3.19l.35 2.39c-4 1-13.85 3.86-21.65 9.53a2 2 0 1 0 2.36 3.23c8.82-6.41 21-9.06 21.86-9.25a118.4 118.4 0 0 1 14.5-.84 117.64 117.64 0 0 1 14.51.84c.91.19 13 2.83 21.86 9.25a2 2 0 1 0 2.36-3.23c-7.8-5.67-17.61-8.52-21.65-9.53l.35-2.39A61.75 61.75 0 0 1 93 24.4a88.17 88.17 0 0 1 14 6.52 156.25 156.25 0 0 1 11 29.64c4.29 17.17 5.64 27.33 6 30.24a52.24 52.24 0 0 1-16.23 11.09Z"></path>
                <path d="M82.77 57.2c-6.15 0-11.16 5.6-11.16 12.48s5 12.47 11.16 12.47 11.17-5.59 11.17-12.47S88.93 57.2 82.77 57.2Zm0 21c-4 0-7.16-3.8-7.16-8.47s3.21-8.48 7.16-8.48 7.17 3.8 7.17 8.48-3.21 8.42-7.17 8.42Z"></path>
              </svg>
              Continue with Discord
            </button>
          </div>
          <div className={styles.separators}>
            <Separator className={styles.separator} />
            <span className={styles.or}>or</span>
            <Separator className={styles.separator} />
          </div>
          <div className="flex flex-col w-full gap-3">
            <Input
              className="!ring-[#D681FF]"
              placeholder="Email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const value: string = e.target.value;
                const filteredValue: string = value.replace(
                  /[^a-zA-Z0-9@.]/g,
                  ""
                );
                setEmail(filteredValue);
              }}
              value={email}
            />
            {windowType === "signUp" && (
              <Input
                className="!ring-[#D681FF]"
                placeholder="Nickname"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value: string = e.target.value;
                  const filteredValue: string = value.replace(
                    /[^a-zA-Zа-яА-Я0-9]/g,
                    ""
                  );
                  setNickname(filteredValue);
                }}
                value={nickname}
              />
            )}
            <Input
              className="!ring-[#D681FF]"
              placeholder="Password"
              type="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const value: string = e.target.value;
                const filteredValue: string = value.replace(
                  /[^a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?~`\\|-]/g,
                  ""
                );

                setPassword(filteredValue);
              }}
              value={password}
            />
            <span
              className={styles.noAccountText}
              onClick={() =>
                setWindowType((prevState) => {
                  if (prevState === "signIn") return "signUp";
                  else return "signIn";
                })
              }
            >
              {windowType === "signIn"
                ? "Еще нет аккаунта? Создать"
                : "Уже есть аккаунт? Войти"}
            </span>
          </div>
          <PrimaryBtn className="mt-4 w-full" onClick={onSubmit}>
            Log in
          </PrimaryBtn>
        </Dialog>
      )}
    </>
  );
};

export default AuthButtonWithDialog;
