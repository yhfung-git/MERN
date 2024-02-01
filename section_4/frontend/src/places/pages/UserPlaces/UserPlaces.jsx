import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import PlaceList from "../../components/PlaceList/PlaceList";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal";

const UserPlaces = () => {
  const { userId } = useParams();
  const [places, setPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUserPlaces = async () => {
      const response = await sendRequest(
        `${import.meta.env.VITE_BASE_URL}/places/user/${userId}`
      );

      if (response !== null) setPlaces(response.places);
    };

    fetchUserPlaces();
  }, [sendRequest, userId]);

  const deleteHandler = (deletedPlaceId) => {
    setPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place._id !== deletedPlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <PlaceList places={places} userId={userId} onDelete={deleteHandler} />
    </>
  );
};

export default UserPlaces;
