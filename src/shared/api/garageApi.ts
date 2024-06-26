import { Car } from "@/entities/Car/types";
import { BASE_URL } from "../constants"

export const getAllCars = async () => {
    const res = await fetch(`${BASE_URL}/garage`)
    return await res.json()
}

export async function getCar(id: number) {
    const res = await fetch(`${BASE_URL}/garage/${id}`);
    const car = await res.json();
    return car;
  }

export const createCar = async (newCar:{name: string, color: string}) => {
    const {name, color} = newCar
    const res =  await fetch(`${BASE_URL}/garage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,color})
    })
    return await res.json()
}

export const deleteCar = async (id: number) => {
    const res = await fetch(`${BASE_URL}/garage/${id}`, {
        method: 'DELETE'
    })
    return await res.json()
}

export const updateCar = async (id: number, name: string, color: string) => {
    const res = await fetch(`${BASE_URL}/garage/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, color})
    })
    return await res.json()
}



