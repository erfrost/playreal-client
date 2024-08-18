import { CaretDown, Money, SignOut } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Pencil, User } from "lucide-react";
import styles from "./index.module.css";
import { deleteCookie } from "cookies-next";

interface MenuWithButtonProps {
  logout: () => void;
}
const MenuWithButton = ({ logout }: MenuWithButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={styles.trigger}>
        <button className={styles.btn}>
          <CaretDown color="#D681FF" size={24} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={styles.content}>
        <DropdownMenuGroup>
          {/* <DropdownMenuLabel className="py-1 px-2">
              <span className="text-neutral-500">Account</span>
            </DropdownMenuLabel> */}
          {/* {user?.is_booster && (
            <DropdownMenuItem className={styles.menuBtn}>
              <Money color="#4CAF50" size={16} />
              Orders
            </DropdownMenuItem>
          )} */}
          <DropdownMenuSeparator className={styles.separator} />
          <DropdownMenuItem className={styles.menuBtn}>
            <User color="#000000" size={16} />
            My profile
          </DropdownMenuItem>
          <DropdownMenuItem className={styles.menuBtn}>
            <Pencil color="#000000" size={16} />
            Edit profile
          </DropdownMenuItem>
          <DropdownMenuSeparator className={styles.DropdownMenuSeparator} />
          <DropdownMenuItem onClick={logout} className={styles.menuBtn}>
            <SignOut color="#000000" size={16} />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuWithButton;
