import { createContext } from "react"

export interface Path {
  pathname: string;
}

export interface Location extends Path {}

interface LocationContextObject {
  location: Location
  setLocation(location: Location): void;
}

const LocationContext = createContext<LocationContextObject>(null!);
export default LocationContext;
