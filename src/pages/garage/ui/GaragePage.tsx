"use client";

import { useEffect, useState } from "react";
import {
  createCar,
  deleteCar,
  getAllCars,
  updateCar,
} from "@/shared/api/garageApi";
import Car from "@/entities/Car/ui/Car";
import styles from "./GaragePage.module.css";
import { Car as CarType } from "@/entities/Car/types";
import Modal from "@/shared/ui/Modal/Modal";
import Pagination from "@/shared/ui/Pagination/Pagination";
import Button from "@/shared/ui/Button/Button";
import Input from "@/shared/ui/Input/Input";
import { generateCars, race, stopCar } from "@/shared/lib/utils";
import Loader from "@/shared/ui/Loader/Loader";

const GaragePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState<CarType[]>([]);
  const [winner, setWinner] = useState<CarType | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [newCar, setNewCar] = useState<{ name: string; color: string } | null>(
    null
  );
  const [selectedCar, setSelectedCar] = useState<{
    id: number;
    name: string;
    color: string;
  } | null>(null);

  const handleGenerateCars = async () => {
    try {
      setIsLoading(true);
      const generatedCars = await generateCars();
      if (generatedCars) {
        setCars((prev) => [...prev, ...generatedCars]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async() => {
    for(const car of activePageData){
      await stopCar(car.id);
    }
    setWinner(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCars = await getAllCars();
        setCars(fetchedCars);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCreateCar = () => {
    if (newCar?.name && newCar?.color) {
      createCar(newCar)
        .then(() => {
          setNewCar(null);
          setCars([...cars, newCar as CarType]);
        })
        .catch((e) => console.error("Error creating car:", e));
    } else {
      alert("No new car data provided");
    }
  };

  const handleUpdateCar = () => {
    if(selectedCar?.name && selectedCar?.color){
      const { id, name, color } = selectedCar
      updateCar(id,name,color)
      .then((data) => {
        const updatedCars = cars.map((car) => (
          car.id === id ? data : car
        ))
        setCars(updatedCars)
        setSelectedCar(null)
      })
      .catch((e)=> console.error("Error updating car:", e))
    }else{
      alert('Select car to update')
    }
  }
  const handleDeleteCar = (id: number) => {
    deleteCar(id)
      .then(() => {
        setCars((prev) => prev.filter((car) => car.id !== id));
      })
      .catch((e) => console.error("Error deleting car:", e));
  };


  const itemsPerPage = 7;

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const activePageData = cars.slice(startIndex, endIndex);

  return (
    <div className={styles.garage}>
      {isLoading && <Loader/>}
      {winner && <Modal winner={winner.name} time={winner.time} resetRace={()=>setWinner(null)} />}
      <div className={styles.garageControls}>
        <div>
          <Button type="filled" onClick={() => race(activePageData, setWinner)}>Race</Button>
          <Button type="filled" onClick={handleReset}>Reset</Button>
          <Button type="filled" onClick={handleGenerateCars}>Generate cars</Button>
        </div>
        <div>
          <Input
            onChange={(val: string) =>
              setNewCar((prev) => ({
                ...prev,
                name: val,
                color: prev?.color || "",
              }))
            }
            type="text"
            value={newCar?.name || ""}
            placeholder="Car name"
          />
          <Input
            onChange={(val: string) =>
              setNewCar((prev) => ({
                ...prev,
                color: val,
                name: prev?.name || "",
              }))
            }
            type="color"
            value={newCar?.color || ""}
          />
          <Button type="filled" onClick={handleCreateCar}>Create</Button>
        </div>
        <div>
          <Input
            onChange={(val: string) =>
              setSelectedCar((prev) => ({
                ...prev,
                name: val,
                color: prev?.color || "",
                id: prev?.id || 0,
              }))
            }
            type="text"
            value={selectedCar?.name || ""}
            placeholder="Car name"
          />
          <Input
            onChange={(val: string) =>
              setSelectedCar((prev) => ({
                ...prev,
                color: val,
                name: prev?.name || "",
                id: prev?.id || 0,
              }))
            }
            type="color"
            value={selectedCar?.color || ""}
          />
          <Button type="filled" onClick={handleUpdateCar}>Update</Button>
        </div>
      </div>
      {activePageData.map(
        (car: { id: number; name: string; color: string }) => (
          <Car
            key={car.id}
            id={car.id}
            name={car.name}
            color={car.color}
            setWinner={setWinner}
            handleDeleteCar={handleDeleteCar}
            selectCar={() => setSelectedCar(car)}
          />
        )
      )}
      <Pagination
        activePage={activePage}
        length={cars.length}
        carPerPage={itemsPerPage}
        changePage={setActivePage}
      />
    </div>
  );
};

export default GaragePage;