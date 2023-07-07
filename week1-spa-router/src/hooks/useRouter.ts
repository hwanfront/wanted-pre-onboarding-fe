import { useContext } from "react";
import LocationContext from "../context/LocationContext";

const useRouter = () => {
  const { setLocation } = useContext(LocationContext);
  
  const push = (to: string) => {
    setLocation({ pathname: to });
    window.history.pushState(null, '', to);
  };

  return { push };
}

export default useRouter;
