import { SetStateAction } from 'react'
import { Car } from '@/entities/Car/types'
import styles from './Modal.module.css'

interface ModalProps {
    winner:string;
    resetRace:() => void
}
const Modal:React.FC<ModalProps> = ({winner,resetRace}) => {
  
  const handleCloseModal = () => {
    resetRace()
  }

  return (
    <div className={styles.modalContainer}>
        <div className={styles.modal}>
            <h2>{winner}</h2>
            <button onClick={handleCloseModal}>Ok</button>
        </div>
    </div>
  )
}

export default Modal