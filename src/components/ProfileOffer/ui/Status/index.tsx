import Already from "../Already";
import AtWork from "../AtWork";
import Pending from "../Pending";

interface StatusProps {
  status: "Pending" | "AtWork" | "Already";
}
const Status = ({ status }: StatusProps) => {
  if (status === "Pending") return <Pending />;
  if (status === "AtWork") return <AtWork />;
  if (status === "Already") return <Already />;
};

export default Status;
