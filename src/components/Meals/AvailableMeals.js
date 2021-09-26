import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-app-5849e-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setLoading(false);
    };

    fetchMeals().catch((error) => {
      setLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealLoading}>
        <h3>Loading...</h3>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealError}>
        <h3>{httpError}</h3>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
