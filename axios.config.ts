import updateToken from "@/api/tokens/updateToken";
import { toastError } from "@/lib/toastifyActions";
import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    let accessToken: string | undefined = getCookie("access_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      try {
        const refreshToken: string | undefined = getCookie("refresh_token");
        if (!refreshToken) return;

        originalRequest._retry = true;

        await updateToken(refreshToken);

        return axiosInstance(originalRequest);
      } catch (err) {
        console.error(err);
        toastError("Ошибка при обновлении токена");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

// import updateToken from "@/api/tokens/updateToken";
// import { toastError } from "@/lib/toastifyActions";
// import axios from "axios";
// import { getCookie } from "cookies-next";
// import { BASEURL } from "environments";

// const axiosInstance = axios.create({
//   baseURL: BASEURL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const isServer: boolean = typeof window === "undefined";

//     let accessToken: string | undefined = isServer
//       ? (await import("next/headers")).cookies().get("access_token")?.value
//       : getCookie("access_token");

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       try {
//         const isServer: boolean = typeof window === "undefined";

//         let refreshToken: string | undefined = isServer
//           ? (await import("next/headers")).cookies().get("refresh_token")?.value
//           : getCookie("refresh_token");

//         if (!refreshToken) return;

//         originalRequest._retry = true;

//         await updateToken(refreshToken);

//         return axiosInstance(originalRequest);
//       } catch (err) {
//         console.error(err);
//         toastError("Ошибка при обновлении токена");
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
