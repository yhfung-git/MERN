import PlaceItem from "../PlaceItem/PlaceItem";
import Card from "../../../shared/components/UIElements/Card/Card";
import "./PlaceList.css";

const PlaceList = (props) => {
  return (
    <div className="center">
      <ul className="place-list">
        {props.places.length === 0 ? (
          <Card>
            <h2>No places found. Maybe create one?</h2>
            <button>Add Place</button>
          </Card>
        ) : (
          props.places.map((place) => <PlaceItem key={place.id} {...place} />)
        )}
      </ul>
    </div>
  );
};

export default PlaceList;
