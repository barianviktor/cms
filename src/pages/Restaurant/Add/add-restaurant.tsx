import React from "react";
import "./add-restaurant.scss";
import TextField from "../../../shared/text-field/text-field";
import { TextFieldStyleTypes } from "../../../interfaces/TextFieldStyleTypes";
import Button from "../../../shared/button/button";

interface Restaurant {
  id?: string;
  name: string;
  image?: string;
  locations: location[];
}
interface location {
  id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  //workers: worker[];
}
interface worker {
  id?: string;
  name: string;
  email: string;
  phone: string;
  position: string;
}
enum Position {
  Manager = "Manager",
  Cook = "Cook",
  Server = "Server",
  Host = "Host",
  Bartender = "Bartender",
  Dishwasher = "Dishwasher",
  Other = "Other",
}

export default function AddRestaurant() {
  const [restaurant, setRestaurant] = React.useState<Restaurant>({
    name: "",
    locations: [],
  });
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const onCreateRestaurant = async () => {
    console.log("create restaurant");
    if (!restaurant.name) {
      setErrors({ name: "Name is required" });
    }
    console.log(restaurant);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestaurant({ ...restaurant, name: e.target.value });
    if (errors.name) delete errors.name;
  };
  const onNameBlur = () => {
    if (!restaurant.name) {
      setErrors({ ...errors, name: "Name is required" });
    }
  };
  return (
    <div>
      <div className="page-head">
        <h1>Add Restaurant</h1>

        <TextField
          id="name"
          label="Name*"
          value={restaurant.name}
          onChange={onNameChange}
          error={errors.name}
          styleType={TextFieldStyleTypes.STANDARD}
          onBlur={onNameBlur}
        />
        <Button
          id="create-restaurant"
          child="Create Restaurant"
          onClick={onCreateRestaurant}
        />
      </div>
    </div>
  );
}
