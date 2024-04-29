import React from 'react'

interface InputProps {
    type: string;
}
const Input: React.FC<InputProps> = ({type}) => {
  return (
    <input type={type} />
  )
}

export default Input