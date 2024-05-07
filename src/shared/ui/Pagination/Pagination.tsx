import React from 'react'
import Button from '../Button/Button';

interface PaginationProps {
    length: number;
    carPerPage: number;
    changePage: (page: number) => void;
  }
const Pagination: React.FC<PaginationProps> = ({ length, carPerPage, changePage }) => {
    const pages = [];

    for (let i = 1; i <= Math.ceil(length / carPerPage); i++) {
      pages.push(i);
    }

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {pages.map((page) => (
        <Button key={page} onClick={() => changePage(page)}>
          {page}
        </Button>
      ))}
    </div>
  )
}

export default Pagination