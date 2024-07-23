import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  changeMarka,
  changeModel,
  changeCity,
  changeInfo,
  changePriceMin,
  changePriceMax,
  changeYearMin,
  changeYearMax,
} from "../../../src/Features/FilteredDataSlice";

export default function Filter() {
  const marka = useSelector((state) => state.filteredData.marka);
  const model = useSelector((state) => state.filteredData.model);
  const infos = useSelector((state) => state.filteredData.info);
  const minYear = useSelector((state) => state.filteredData.yearMin);
  const maxYear = useSelector((state) => state.filteredData.yearMax);
  const minPrice = useSelector((state) => state.filteredData.priceMin);
  const maxPrice = useSelector((state) => state.filteredData.priceMax);
  const city = useSelector((state) => state.filteredData.city);

  const dispatch = useDispatch();
  const [seletedMarka, setSeletedMarka] = useState("");
  const [seletedModel, setSeletedModel] = useState("");
  const [info, setInfo] = useState(infos);
  const [markas, setMarkas] = useState([]);
  const [filteredMarkas, setFilteredMarkas] = useState([]);
  const [models, setModels] = useState([]);
  const [dis, setDis] = useState("0");

  const url = "http://localhost:27001/cars";

  useEffect(() => {
    FillMarka();
    dispatch(changeInfo("Hamısı"));
    dispatch(changeMarka(""));
    dispatch(changeModel(""));
    dispatch(changePriceMin(""));
    dispatch(changePriceMax(""));
    dispatch(changeYearMax(""));
    dispatch(changeYearMin(""));
    dispatch(changeCity(""));
  }, []);

  useEffect(() => {
    if (markas.length > 0) {
      FilterMarkas();
    }
  }, [markas]);

  useEffect(() => {
    FilterModel();
  }, [seletedMarka]);

  function selectNewMarka(e) {
    setSeletedMarka(e.target.value);
  }

  function selectNewModel(e) {
    setSeletedModel(e.target.value);
  }

  function FilterMarkas() {
    const uniqueBrands = [];
    const filtered = markas.filter((item) => {
      if (!uniqueBrands.includes(item.Marka)) {
        uniqueBrands.push(item.Marka);
        return true;
      }
      return false;
    });
    setFilteredMarkas(filtered);
  }

  function FilterModel() {
    const uniqueBrands = [];
    const filtered = markas.filter((item) => {
      if (!uniqueBrands.includes(item.Model) && item.Marka == seletedMarka) {
        uniqueBrands.push(item.Model);
        return true;
      }
      return false;
    });
    setModels(filtered);
  }

  function FillMarka() {
    axios.get(url).then((d) => {
      setMarkas(d.data);
    });
  }

  return (
    <section
      style={{
        paddingTop: "30px",
        paddingBottom: "30px",
        backgroundColor: "white",
      }}
    >
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "-100px",
        }}
      >
        <select
          value={seletedMarka}
          style={{
            color: "black",
            width: "25%",
            padding: "10px",
            fontSize: "1.5em",
            borderRadius: "8px",
          }}
          onChange={(e) => {
            selectNewMarka(e);
            dispatch(changeMarka(e.target.value));
            setDis("1");
          }}
        >
          <option value="" disabled hidden>
            Marka
          </option>
          {filteredMarkas &&
            filteredMarkas.map((d) => <option d={d.Marka}>{d.Marka}</option>)}
        </select>
        <select
          disabled={models.length == 0 ? true : false}
          value={seletedModel}
          style={{
            color: "black",
            width: "25%",
            padding: "10px",
            fontSize: "1.5em",
            borderRadius: "8px",
            marginLeft: "100px",
          }}
          onChange={(e) => {
            selectNewModel(e);
            dispatch(changeModel(e.target.value));
            setDis("1");
          }}
        >
          <option value="" disabled hidden>
            Model
          </option>
          {models && models.map((d) => <option d={d.Model}>{d.Model}</option>)}
        </select>
        <section
          style={{
            display: "flex",
            justifyContent: "start",
            backgroundColor: "white",
            width: "25%",
            marginLeft: "100px",
            borderRadius: "10px",
          }}
        >
          <section
            onClick={() => {
              setInfo("Hamısı");
              dispatch(changeInfo("Hamısı"));
              setDis("1");
            }}
            style={{
              border: "1px solid black",
              borderRadius: "10px 0px 0px 10px",
              paddingTop: "12px",
              paddingLeft: "20px",
              width: "30%",
              marginTop: "0px",
              backgroundColor: info == "Hamısı" ? "red" : "white",
              color: info == "Hamısı" ? "white" : "black",
            }}
          >
            <h1 style={{ fontSize: "1.2em" }}>Hamısı</h1>
          </section>

          <section
            onClick={() => {
              setInfo("Yeni");
              dispatch(changeInfo("Yeni"));
              setDis("1");
            }}
            style={{
              border: "0px solid black",
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              width: "30%",
              paddingTop: "12px",
              paddingLeft: "30px",
              backgroundColor: info == "Yeni" ? "red" : "white",
              color: info == "Yeni" ? "white" : "black",
            }}
          >
            <h1 style={{ fontSize: "1.2em" }}>Yeni</h1>
          </section>

          <section
            onClick={() => {
              setInfo("Sürülmüş");
              dispatch(changeInfo("Sürülmüş"));
              setDis("1");
            }}
            style={{
              border: "1px solid black",
              borderRadius: "0px 10px 10px 0px",
              paddingLeft: "20px",
              paddingTop: "12px",
              width: "40%",
              backgroundColor: info == "Sürülmüş" ? "red" : "white",
              color: info == "Sürülmüş" ? "white" : "black",
            }}
          >
            <h1 style={{ fontSize: "1.2em" }}>Sürülmüş</h1>
          </section>
        </section>
      </section>

      <section
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "0px",
          marginTop: "20px",
        }}
      >
        <section
          style={{ width: "27%", display: "flex", justifyContent: "start" }}
        >
          <input
            type="number"
            value={minPrice}
            onChange={(e) => {
              dispatch(changePriceMin(Number(e.target.value)));
              setDis("1");
            }}
            step={100}
            min={0}
            max={999900}
            style={{
              width: "50%",
              fontSize: "1.2em",
              border: "2px solid black",
              borderRight: "0px solid black",
              borderRadius: "10px 0px 0px 10px",
              padding: "10px",
              margin: "0px",
              backgroundColor: "white",
            }}
            placeholder="Qiymət,min"
          ></input>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => {
              dispatch(changePriceMax(Number(e.target.value)));
              setDis("1");
            }}
            step={100}
            min={0}
            max={999900}
            style={{
              width: "50%",
              fontSize: "1.2em",
              border: "2px solid black",
              borderRadius: "0px 10px 10px 0px",
              padding: "10px",
              backgroundColor: "white",
              margin: "0px",
            }}
            placeholder="Qiymət,max"
          ></input>
        </section>

        <section
          style={{
            width: "27%",
            display: "flex",
            justifyContent: "start",
            marginLeft: "100px",
          }}
        >
          <input
            type="number"
            value={minYear}
            onChange={(e) => {
              dispatch(changeYearMin(Number(e.target.value)));
              setDis("1");
            }}
            step={3}
            min={2000}
            max={2024}
            style={{
              width: "50%",
              fontSize: "1.5em",
              border: "2px solid black",
              borderRight: "0px solid black",
              borderRadius: "10px 0px 0px 10px",
              padding: "10px",
              margin: "0px",
              backgroundColor: "white",
            }}
            placeholder="İl,min"
          ></input>
          <input
            type="number"
            value={maxYear}
            onChange={(e) => {
              dispatch(changeYearMax(Number(e.target.value)));
              setDis("1");
            }}
            step={3}
            min={2000}
            max={2024}
            style={{
              width: "50%",
              fontSize: "1.5em",
              border: "2px solid black",
              borderRadius: "0px 10px 10px 0px",
              padding: "10px",
              backgroundColor: "white",
              margin: "0px",
            }}
            placeholder="İl,max"
          ></input>
        </section>

        <section
          style={{
            width: "27%",
            display: "flex",
            justifyContent: "start",
            marginLeft: "100px",
          }}
        >
          <input
            type="text"
            value={city}
            onChange={(e) => {
              dispatch(changeCity(e.target.value));
              setDis("1");
            }}
            style={{
              width: "100%",
              fontSize: "1.5em",
              border: "2px solid black",
              borderRadius: "10px",
              padding: "10px",
              margin: "0px",
              backgroundColor: "white",
            }}
            placeholder="Şəhər"
          ></input>
        </section>
      </section>

      <Link
        to="/filtered_cars"
        style={{ pointerEvents: dis == "0" ? "none" : "visible" }}
      >
        <button
          style={{
            marginTop: "30px",
            width: "20%",
            marginLeft: "78%",
            marginRight: "30px",
            padding: "20px 0px 20px 0px",
            textAlign: "center",
            fontSize: "1.2em",
            backgroundColor: "red",
            borderRadius: "10px",
            border: "2px solid black",
          }}
        >
          Elanları göstər
        </button>
      </Link>
    </section>
  );
}
