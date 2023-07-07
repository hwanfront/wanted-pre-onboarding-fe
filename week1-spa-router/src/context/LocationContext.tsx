import { createContext } from "react"
import type { Location } from "../utils/createRouter";

interface LocationContextObject {
  location: Location
  setLocation(location: Location): void;
}

const LocationContext = createContext<LocationContextObject>(null!);
export default LocationContext;
