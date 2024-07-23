import React, { useEffect, useState } from 'react';
import axios from "axios";
import FavouriteCar from './FavouriteCar';
import { useDispatch } from 'react-redux';
import { changePath } from '../../Features/FilteredDataSlice';

export default function FavCars() {
  const url = "http://localhost:27002/favCars";

  let [datas, setDatas] = useState();

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePath("/favourites"));
    GetMovies();
  })

  function GetMovies() {
    axios.get(url).then((d) => {
      console.log(d);
      setDatas(d.data);
    });
  }
  return (
    <section style={{ paddingBottom: "100px", backgroundColor: "white" }}>
      <section style={{ padding: "30px", backgroundColor: "white" }}>
        <h1 style={{ fontWeight: "bolder", fontSize: "1.5em", textAlign: "start" }}>SECILMIS ELANLAR:</h1>
      </section>
      <section style={{display: 'flex', flexWrap: "wrap", justifyContent: "start" }}>
        {datas &&
          (
            datas.map((d) =>
            (
              <FavouriteCar d={d}></FavouriteCar>
            ))
          )
        }

      </section>
    </section>
  )
}
