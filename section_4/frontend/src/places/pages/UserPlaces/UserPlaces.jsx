import { useParams } from "react-router-dom";

import PlaceList from "../../components/PlaceList/PlaceList";
import { PLACES } from "../../../DUMMY_DATA";

const UserPlaces = () => {
  const { userId } = useParams();
  const loadedPlaces = PLACES.filter((place) => place.creator === userId);
  return <PlaceList places={loadedPlaces} />;
};

export default UserPlaces;
