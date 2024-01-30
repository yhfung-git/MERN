import { Link } from "react-router-dom";

import Avatar from "../../../shared/components/UIElements/Avatar/Avatar";
import Card from "../../../shared/components/UIElements/Card/Card";
import "./UserItem.css";

const UserItem = (props) => {
  const image = `http://localhost:5000/${props.image}`;

  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props._id}/places`}>
          <div className="user-item__image">
            <Avatar image={image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.places.length}{" "}
              {props.places.length <= 1 ? "place" : "places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
