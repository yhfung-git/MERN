import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./Map.css";

const Map = (props) => {
  const { lat, lng } = props.location;
  const position = [lat, lng];

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
      <Marker position={position}>
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
