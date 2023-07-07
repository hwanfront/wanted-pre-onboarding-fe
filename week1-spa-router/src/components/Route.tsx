import { useContext } from "react";
import LocationContext from "../context/LocationContext";

interface RouteProps {
  path: string
  component: React.ReactNode;
}

const Route = ({ path, component }: RouteProps) => {
  const { location } = useContext(LocationContext);

  return location.pathname === path ? <>{component}</> : null;
}

export default Route;