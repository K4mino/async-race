import React from 'react'
import { Dispatch, SetStateAction } from "react";
import { Car as CarType } from '../types';
import styles from './Car.module.css'
import Button from '@/shared/ui/Button/Button'
import {startCar, stopCar, startCarAndDrive} from '@/shared/lib/utils'

interface CarProps {
    id: number;
    name: string;
    color: string;
    setWinner: Dispatch<SetStateAction<CarType | null>>
}

const Car: React.FC<CarProps> = ({name,color,id,setWinner}) => {
  return (
    <div className={styles.carContainer}>
        <div className={styles.carControls}>
            <Button onClick={() => startCarAndDrive(id,setWinner)}>Go</Button>
            <Button onClick={() => stopCar(id)}>Stop</Button>
          
            
        </div>
        <div id={`car-${id}`} className={styles.car} style={{backgroundColor: color}}>
            {name}
        </div>
    </div>
  )
}

export default Car