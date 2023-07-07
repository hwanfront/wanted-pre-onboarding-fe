import * as React from "react";
import LocationContext from "../context/LocationContext";

interface RouterProps {
  children?: React.ReactNode;
}

const Router = ({ children }: RouterProps) => {
  const [location, setLocation] = React.useState({ pathname: "/" });

  const handleLocation = () => {
    const { pathname } = window.location;
    setLocation({ pathname });
  }

  React.useEffect(() => {
    handleLocation()
  }, [])
  

  window.onpopstate = () => {
    handleLocation()
  }

  return (
    <LocationContext.Provider 
      children={children}
      value={{ location, setLocation }}
    />
  );
}

export default Router;
