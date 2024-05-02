"use client"

import React, { useEffect } from "react";
import { getAllCars } from "@/shared/api/garageApi";
import Car  from "@/entities/Car/ui/Car";
import styles from './Garage.module.css'
import { Car  as CarType} from "@/entities/Car/types";

const Garage = () => {
   const [cars, setCars] = React.useState([]);
   const [winner,setWinner] = React.useState<CarType | null>(null);

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
        {winner && <h1>{winner.name}</h1>}
        {
            cars.map((car:{id: number, name: string, color: string}) => (
                <Car key={car.id} id={car.id} name={car.name} color={car.color} setWinner={setWinner}/>
            ))
        }
    </div>
  );
};

export default Garage;
