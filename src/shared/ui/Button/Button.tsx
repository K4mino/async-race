import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type: "filled" | "text" | "outlined";
  }
const Button: React.FC<ButtonProps> = ({children,type,...props}) => {
  return (
    <button className={styles.button + " " + styles[type]} {...props}>
        {children}
    </button>
  )
}

export default Button