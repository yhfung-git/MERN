import { useContext } from "react";

import { AuthContext } from "../../../shared/context/auth-context";
import PlaceItem from "../PlaceItem/PlaceItem";
import Card from "../../../shared/components/UIElements/Card/Card";
import Button from "../../../shared/components/FormElements/Button/Button";
import "./PlaceList.css";

const PlaceList = (props) => {
  const auth = useContext(AuthContext);
  return (
    <div className="center">
      <ul className="place-list">
        {props.places.length === 0 ? (
          props.userId === auth.userId ? (
            <Card>
              <h2>No places found. Maybe add one?</h2>
              <Button to="/places/new">Add Place</Button>
            </Card>
          ) : (
            <Card>
              <h2>This user does not have any places.</h2>
            </Card>
          )
        ) : (
          props.places.map((place) => (
            <PlaceItem key={place._id} {...place} onDelete={props.onDelete} />
          ))
        )}
      </ul>
    </div>
  );
};

export default PlaceList;
