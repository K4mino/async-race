import React from 'react'
import styles from './Car.module.css'
import Button from '@/shared/ui/Button/Button'
import {startCar, stopCar, editCar, deleteCar, startCarAndDrive} from '@/shared/lib/utils'

interface CarProps {
    id: number;
    name: string;
    color: string;
}

const Car: React.FC<CarProps> = ({name,color,id}) => {
  return (
    <div className={styles.carContainer}>
        <div className={styles.carControls}>
            <Button onClick={() => startCarAndDrive(id)}>Go</Button>
            <Button onClick={() => stopCar(id)}>Stop</Button>
          
            <Button onClick={() => deleteCar(id)}>Delete</Button>
        </div>
        <div id={`car-${id}`} className={styles.car} style={{backgroundColor: color}}>
            {name}
        </div>
    </div>
  )
}

export default Car