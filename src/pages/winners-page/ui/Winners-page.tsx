"use client";
import { useEffect, useState } from "react";
import { getWinners } from "@/shared/api/winnersApi";
import { Car as CarType } from "@/entities/Car/types";
import styles from "./WinnersPage.module.css";
import Pagination from "@/shared/ui/Pagination/Pagination";

const WinnersPage = () => {
  const [winners, setWinners] = useState<CarType[]>([]);
  const [activePage,setActivePage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedWinners = await getWinners();

      setWinners(fetchedWinners);
    };
    fetchData();
  }, []);

  const itemsPerPage = 10;

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const activePageData = winners.slice(startIndex, endIndex);

  return (
    <div>
      <h2>Winners count:{winners.length}</h2>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Car</th>
            <th className={styles.th}>Car name</th>
            <th className={styles.th}>Wins</th>
            <th className={styles.th}>Time</th>
          </tr>
        </thead>
        <tbody>
          {activePageData.map((winner) => (
            <tr key={winner.id}>
              <td className={styles.td}>
                <svg
                  fill={winner.color}
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 31.445 31.445"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <g>
                        <path d="M7.592,16.86c-1.77,0-3.203,1.434-3.203,3.204s1.434,3.204,3.203,3.204c1.768,0,3.203-1.434,3.203-3.204 S9.36,16.86,7.592,16.86z M7.592,21.032c-0.532,0-0.968-0.434-0.968-0.967s0.436-0.967,0.968-0.967 c0.531,0,0.966,0.434,0.966,0.967S8.124,21.032,7.592,21.032z"></path>{" "}
                        <path d="M30.915,17.439l-0.524-4.262c-0.103-0.818-0.818-1.418-1.643-1.373L27.6,11.868l-3.564-3.211 c-0.344-0.309-0.787-0.479-1.249-0.479l-7.241-0.001c-1.625,0-3.201,0.555-4.468,1.573l-4.04,3.246l-5.433,1.358 c-0.698,0.174-1.188,0.802-1.188,1.521v1.566C0.187,17.44,0,17.626,0,17.856v2.071c0,0.295,0.239,0.534,0.534,0.534h3.067 c-0.013-0.133-0.04-0.26-0.04-0.396c0-2.227,1.804-4.029,4.03-4.029s4.029,1.802,4.029,4.029c0,0.137-0.028,0.264-0.041,0.396 h8.493c-0.012-0.133-0.039-0.26-0.039-0.396c0-2.227,1.804-4.029,4.029-4.029c2.227,0,4.028,1.802,4.028,4.029 c0,0.137-0.026,0.264-0.04,0.396h2.861c0.295,0,0.533-0.239,0.533-0.534v-1.953C31.449,17.68,31.21,17.439,30.915,17.439z M20.168,12.202l-10.102,0.511L12,11.158c1.051-0.845,2.357-1.305,3.706-1.305h4.462V12.202z M21.846,12.117V9.854h0.657 c0.228,0,0.447,0.084,0.616,0.237l2.062,1.856L21.846,12.117z"></path>{" "}
                        <path d="M24.064,16.86c-1.77,0-3.203,1.434-3.203,3.204s1.434,3.204,3.203,3.204c1.769,0,3.203-1.434,3.203-3.204 S25.833,16.86,24.064,16.86z M24.064,21.032c-0.533,0-0.967-0.434-0.967-0.967s0.434-0.967,0.967-0.967 c0.531,0,0.967,0.434,0.967,0.967S24.596,21.032,24.064,21.032z"></path>{" "}
                      </g>
                    </g>
                  </g>
                </svg>
              </td>
              <td className={styles.td}>{winner.name}</td>
              <td className={styles.td}>{winner.wins}</td>
              <td className={styles.td}>{winner.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        activePage={activePage}
        length={winners.length}
        carPerPage={itemsPerPage}
        changePage={setActivePage}
      />
    </div>
  );
};

export default WinnersPage;
