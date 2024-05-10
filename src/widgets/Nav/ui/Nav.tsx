import Button from '@/shared/ui/Button/Button'
import Link from 'next/link'
import React from 'react'
import styles from './Nav.module.css' 

export const Nav:React.FC = () => {
  return (
    <div className={styles.nav}>
      <Link href={'/'}>
        <Button type='text'>Garage</Button>
      </Link>
      <Link href={'/winners'}>
        <Button type='text'>Winners</Button>
      </Link>
    </div>
  )
}
