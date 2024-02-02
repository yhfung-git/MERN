import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./Map.css";
import Icon from "../../../../../public/icon.svg";

const Map = (props) => {
  const { lat, lng } = props.location;
  const position = [lat, lng];

  const customIcon = new L.Icon({
    iconUrl: Icon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={props.style}
      className={`map ${props.className}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          <div>
            <h3>{props.address}</h3>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
