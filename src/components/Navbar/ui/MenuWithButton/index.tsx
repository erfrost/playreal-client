import { CaretDown, Money, SignOut } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MessageCircle, Pencil, User } from "lucide-react";
import styles from "./index.module.css";
import { UserInfo } from "@/models/User.model";
import Link from "next/link";

interface MenuWithButtonProps {
  logout: () => void;
  user: UserInfo | null;
}
const MenuWithButton = ({ logout, user }: MenuWithButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={styles.trigger}>
        <button className={styles.btn}>
          <CaretDown color="#D681FF" size={24} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={styles.content}>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="py-1 px-2">
            <span className="text-neutral-500">Account</span>
          </DropdownMenuLabel>
          {user && user.role === "booster" && (
            <Link href="/orders">
              <DropdownMenuItem className={styles.menuBtn}>
                <Money color="#4CAF50" size={16} />
                Orders
              </DropdownMenuItem>
            </Link>
          )}
          <DropdownMenuSeparator className={styles.separator} />
          <Link href="/profile">
            <DropdownMenuItem className={styles.menuBtn}>
              <User color="#000000" size={16} />
              My profile
            </DropdownMenuItem>
          </Link>
          <Link href="/profile/edit">
            <DropdownMenuItem className={styles.menuBtn}>
              <Pencil color="#000000" size={16} />
              Edit profile
            </DropdownMenuItem>
          </Link>
          <Link href="/chats">
            <DropdownMenuItem className={styles.menuBtn}>
              <MessageCircle color="#000000" size={16} />
              Chats
            </DropdownMenuItem>
          </Link>
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
