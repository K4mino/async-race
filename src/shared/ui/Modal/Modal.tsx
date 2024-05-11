import { SetStateAction } from 'react'
import { Car } from '@/entities/Car/types'
import styles from './Modal.module.css'
import Button from '../Button/Button'

interface ModalProps {
    winner:string;
    resetRace:() => void;
    time?:number;
}
const Modal:React.FC<ModalProps> = ({winner,resetRace,time}) => {
  
  const handleCloseModal = () => {
    resetRace()
  }

  return (
    <div className={styles.modalContainer}>
        <div className={styles.modal}>
            <h2 className={styles.modalText}>Winner:{winner}</h2>
            <h2 className={styles.modalText}>Time:{time} S</h2>
            <Button type='filled' onClick={handleCloseModal}>Ok</Button>
        </div>
    </div>
  )
}

export default Modal