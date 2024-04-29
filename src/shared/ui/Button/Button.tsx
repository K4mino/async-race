import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void
  }
const Button: React.FC<ButtonProps> = ({children,...props}) => {
  return (
    <button className={styles.button} {...props}>
        {children}
    </button>
  )
}

export default Button