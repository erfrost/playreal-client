import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Link from "next/link";

interface Route {
  title: string;
  path: string;
}
interface BreadcrumbNavProps {
  routes: Route[];
  theme: "dark" | "white";
}
const BreadcrumbNav = ({ routes, theme }: BreadcrumbNavProps) => {
  const [screenWidth, setScreenWidth] = useState<number>(1920);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  if (!routes || screenWidth <= 825) return null;

  return (
    <div
      className={`${styles.container} ${
        theme === "white" && styles.containerWhite
      }`}
    >
      {routes.slice(0, -1).map((route: Route, index: number) => (
        <div className={styles.link} key={index}>
          <Link href={route.path} className={styles.item}>
            {route.title}
          </Link>
          <span className={styles.separator}>/</span>
        </div>
      ))}
      <span className={styles.activeItem}>{routes.slice(-1)[0].title}</span>
    </div>
  );
};

export default BreadcrumbNav;
