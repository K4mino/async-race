"use client"

import React, { useEffect } from "react";
import { getAllCars } from "@/shared/api/garageApi";
import Car from "@/entities/Car/ui/Car";
import styles from './Garage.module.css'

const Garage = () => {
   const [cars, setCars] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCars = await getAllCars();
        setCars(fetchedCars);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData()
  }, []);

  return (
    <div className={styles.garage}>
        {
            cars.map((car:{id: number, name: string, color: string}) => (
                <Car key={car.id} id={car.id} name={car.name} color={car.color}/>
            ))
        }
    </div>
  );
};

export default Garage;
