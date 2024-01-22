import { useParams } from "react-router-dom";

import PlaceList from "../../components/PlaceList/PlaceList";

const PLACES = [
  {
    id: "p1",
    title: "Les Deux Alpes",
    description: "Les Deux Alpes is a ski resort in France.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Les2Alpes.jpg",
    address: "ZAC le, Clos des Fonds, 38860 Les Deux Alpes",
    location: { lat: 45.0055207, lng: 6.0958591 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Exploratorium",
    description: "A museum of science, technology, and arts in San Francisco.",
    image:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/54/8c.jpg",
    address: "Pier 15 Embarcadero at, Green St, San Francisco, CA 94111",
    location: { lat: 37.796262, lng: -122.4043911 },
    creator: "u2",
  },
];

const UserPlaces = () => {
  const { userId } = useParams();
  const loadedPlaces = PLACES.filter((place) => place.creator === userId);
  return <PlaceList places={loadedPlaces} />;
};

export default UserPlaces;
