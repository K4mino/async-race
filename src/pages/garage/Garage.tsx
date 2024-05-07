"use client"

import { useEffect, useState } from "react";
import { createCar, getAllCars } from "@/shared/api/garageApi";
import Car  from "@/entities/Car/ui/Car";
import styles from './Garage.module.css'
import { Car  as CarType} from "@/entities/Car/types";
import Modal from "@/shared/ui/Modal/Modal";
import Pagination from "@/shared/ui/Pagination/Pagination";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";
import { generateCars, race, stopCar } from "@/shared/lib/utils";

const Garage = () => {
   const [cars, setCars] = useState<CarType[]>([]);
   const [winner,setWinner] = useState<CarType | null>(null);
   const [activePage, setActivePage] = useState(1);
   const [newCar, setNewCar] = useState<{name: string, color: string} | null>(null);
   const [selectedCar, setSelectedCar] = useState<{name: string, color: string} | null>(null);

  const handleGenerateCars = async() => {
    try {
      const generatedCars = await generateCars();
      if(generatedCars){
        setCars(prev => [...prev, ...generatedCars]);
      };
    } catch (error) {
      console.log(error);
    }
  }

  const handleReset = () => {
    activePageData.forEach((car) => {
      stopCar(car.id)
    })
    setWinner(null)
  }

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

  const handleCreateCar = () => {
    if(newCar){
      createCar(newCar).then(() => {
        setNewCar(null);
        setCars([...cars, newCar as CarType]);
      }).catch((e) => console.error("Error creating car:", e));
    }else {
      alert("No new car data provided");
    }
  }

  const itemsPerPage = 7

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const activePageData = cars.slice(startIndex, endIndex);

  return (
    <div className={styles.garage}>
        {winner && <Modal winner={winner.name} resetRace={handleReset}/>}
        <div className={styles.garageControls}>
          <div>
            <Button onClick={() => race(activePageData,setWinner)}>Race</Button>
            <Button>Reset</Button>
            <Button onClick={handleGenerateCars}>Generate cars</Button>
          </div>
          <div>
            <Input onChange={(val:string) => setNewCar((prev) =>(
              {
                ...prev,
                name: val,
                color: prev?.color || ''
              }
            ))} type="text" value={newCar?.name || ''}/>
            <Input onChange={(val:string) => setNewCar((prev) =>(
              {
                ...prev,
                color: val,
                name: prev?.name || ''
              }
            ))} type="color" value={newCar?.color || ''}
            />
            <Button onClick={handleCreateCar}>Create</Button>
          </div>
          <div>
            <Input onChange={(val:string) => setSelectedCar((prev) =>(
              {
                ...prev,
                name: val,
                color:prev?.color || ''
              }
            ))} 
            type="text" 
            value={selectedCar?.name ||  ''}
            />
            <Input onChange={(val:string) => setSelectedCar((prev) =>(
              {
                ...prev,
                color:val,
                name: prev?.name || ''
              }
            ))} 
            type="color" 
            value={selectedCar?.color || ''}
            />
            <Button >Update</Button>
          </div>
        </div>
        {
            activePageData.map((car:{id: number, name: string, color: string}) => (
                <Car key={car.id} id={car.id} name={car.name} color={car.color} setWinner={setWinner}/>
            ))
        }
        <Pagination length={cars.length} carPerPage={itemsPerPage} changePage={setActivePage}/>
    </div>
  );
};

export default Garage;
