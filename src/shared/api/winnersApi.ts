import { Dispatch, SetStateAction } from "react";
import { BASE_URL } from "../constants" 
import { Car as CarType} from "@/entities/Car/types";
import { getCar } from "../api/garageApi";


export const getWinners = async () => {
    const winners = [];
    const res = await fetch(`${BASE_URL}/winners`);

    const data = await res.json()

    for(const car of data){
        const {name, color} = await getCar(car.id);
        winners.push({
            id: car.id,
            name,
            color,
            wins: car.wins,
            time: car.time
        })
    }

    return winners
}

const getWinner = async (id: number) => {
    const res = await fetch(`${BASE_URL}/winners/${id}`);
    return res;
}

const updateWinner = async (id: number, wins: number, time: number) => {
    const res = await fetch(`${BASE_URL}/winners/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({wins, time})
    })
    return await res.json()
}

export async function addWinner(id: number, newTime: number,setWinner: Dispatch<SetStateAction<CarType | null>>,) {
    try {
      const newWinner = await getCar(id);
      const fixedTime = (newTime/1000).toFixed(2)
      const { name, color } = newWinner;
      setWinner({
        ...newWinner,
        time:fixedTime
      })

      const winner = await getWinner(id);
      console.log(winner)
      if(winner.ok){
        const { wins, time } = await winner.json();
        const winsCount = wins ? wins + 1 : 1;
        const bestTime = time ? Math.min(time, newTime) : newTime;
        await updateWinner(id, winsCount, bestTime)
      }else {
        await fetch(`${BASE_URL}/winners`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              name,
              color,
              wins: 1,
              time:fixedTime,
            }),
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

