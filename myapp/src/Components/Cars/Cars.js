import React, { useEffect, useState } from 'react';
import axios from "axios";
import Car from './Car';
import Filter from '../Filter/Filter';
import { useDispatch, useSelector } from "react-redux";
import { changePath } from '../../Features/FilteredDataSlice';

export default function Cars() {
    const url = "http://localhost:27001/cars";

    const [datas, setDatas] = useState();
    const cars = useSelector((state) => state.cars.cars);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changePath("/"));
        GetMovies();


    })

    function GetMovies() {
        axios.get(url).then((d) => {
            console.log(d);
            setDatas(d.data);
        });
    }
    return (
        <section>
            <Filter></Filter>
            <section style={{ display: 'flex', flexWrap: "wrap", justifyContent: "start", backgroundColor: "white", paddingBottom: "100px" }}>

                {datas &&
                    (
                        datas.map((d) =>
                        (
                            <Car d={d}></Car>
                        ))
                    )
                }
            </section>

        </section>
    )
}
