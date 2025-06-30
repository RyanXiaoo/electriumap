import MapBox from "./Components/MapBox";
import AddOutlet from "./Components/AddOutlet";

export default function Home() {
  return <div className="relative w-full h-screen">
    <MapBox />
    <AddOutlet />
  </div>;
}
