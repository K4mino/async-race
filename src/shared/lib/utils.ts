import { Dispatch, SetStateAction } from "react";
import { BASE_URL } from "../constants"
import { Car } from "@/entities/Car/types";
import { getCar } from "../api/garageApi";

type AnimationsType ={
    [key: number]: number
}

const results:number[] = []
const animations:AnimationsType = {}

export const startCar = async (id: number) => {
    return (
      await fetch(`${BASE_URL}/engine?id=${id}&status=started`, {
        method: "PATCH",
      })
    ).json();
  };
  
  export const stopCar = async (id: number) => {
    fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, {
      method: "PATCH",
    }).then((res) => {
        const car = <HTMLDivElement>document.getElementById(`car-${id}`);
        window.cancelAnimationFrame(animations[id]);
        car.style.transform = "translateX(0)";
    }).catch((e) => console.error("Error stopping car:", e));
  };
  
  
  export const startDrive = async (id: number) => {
    const res = await fetch(
      `${BASE_URL}/engine?id=${id}&status=drive`,
      {
        method: "PATCH",
        
      },
    );
    const data = await res.json();
    return data;
  };
  
  export const startCarAndDrive = (id: number,setWinner: Dispatch<SetStateAction<Car | null>>,) => {
    startCar(id).then((res) => {
      const { velocity, distance } = res;
      const car = <HTMLDivElement>document.getElementById(`car-${id}`);
      const animationId = startAnimation(id, velocity, distance, car, setWinner);
      startDrive(id).then((res) => {
        if (!res.success) {
          window.cancelAnimationFrame(animationId);
        }
      });
    });
  };
  
  function startAnimation(
    id: number,
    velocity: number,
    distance: number,
    car: HTMLDivElement,
    setWinner: Dispatch<SetStateAction<Car | null>>,
  ) {
    let start: number | null = null;
    const time = distance / velocity;
    let animationId: number;
    const screenWidth = document.body.clientWidth;
    const positionCar = (screenWidth / 100) * 15;
    const distanceAnimation = screenWidth - positionCar;
  
    function animate(timeStamp: number) {
      if (!start) {
        start = timeStamp;
      }
  
      const elapsed = timeStamp - start;
      const progress = Math.min(elapsed / time, 1);
  
      car.style.transform = `translateX(${progress * distanceAnimation}px)`;
  
      if (progress < 1 ) {
        animationId = window.requestAnimationFrame(animate);
        animations[id] = animationId
      }
  
      if (progress >= 1) {
        if (results.length === 0) addWinner(id, time, setWinner);
        results.push(id)
      }
    }
    animationId = window.requestAnimationFrame(animate);

    return animationId
  }
  
  async function addWinner(id: number, time: number,setWinner: Dispatch<SetStateAction<Car | null>>,) {
    try {
      const winnerCar = await getCar(id);
      setWinner(winnerCar)

      const { wins } = await fetch(`${BASE_URL}/winner/${id}`);
  
      if (!wins) {
        await fetch(`${BASE_URL}/winners`, {
          method: "POST",
          body: JSON.stringify({
            id,
            wins: 1,
            time,
          }),
        });
      } else {
        await fetch(`${BASE_URL}/winners`, {
          method: "POST",
          body: JSON.stringify({
            id,
            wins: wins + 1,
            time,
          }),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }


