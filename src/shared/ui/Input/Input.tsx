import {Dispatch,SetStateAction, ChangeEvent} from 'react'
import styles from './Input.module.css'


interface InputProps {
    type: string;
    onChange:(val:string) => void;
    value: string;
}
const Input: React.FC<InputProps> = ({type,onChange,value}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value;
    onChange(newValue);
  };
  
  return (
    <input className={styles.input} type={type} onChange={handleChange} value={value}/>
  )
}

export default Input