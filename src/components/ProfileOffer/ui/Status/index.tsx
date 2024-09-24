import Already from "../Already";
import AtWork from "../AtWork";
import Pending from "../Pending";
import Review from "../Review";

interface StatusProps {
  status: "Pending" | "AtWork" | "Review" | "Already";
}
const Status = ({ status }: StatusProps) => {
  if (status === "Pending") return <Pending />;
  if (status === "AtWork") return <AtWork />;
  if (status === "Review") return <Review />;
  if (status === "Already") return <Already />;
};

export default Status;
