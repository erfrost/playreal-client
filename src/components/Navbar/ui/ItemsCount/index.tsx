import Skeleton from "@/components/ui/Skeleton";
import { useEffect, useState } from "react";

const ItemsCount = ({ count }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="select-none absolute w-4 h-4 rounded-full text-xs text-white bg-[#D681FF] flex items-center justify-center -top-2 -right-2">
      {isLoading ? <Skeleton className="w-4 h-4" /> : count}
    </div>
  );
};

export default ItemsCount;
