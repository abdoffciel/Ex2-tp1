import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMale, FaFemale, FaWeight, FaRulerVertical } from "react-icons/fa";
import hommeImage from './assets/homme.png'; 
import femmeImage from './assets/femme.png'; 


import { createSlice } from "@reduxjs/toolkit";

export const imcSlice = createSlice({
  name: "imc",
  initialState: {
    taille: 0,
    poids: 0,
    gender: "homme",
    result: null,
  },
  reducers: {
    setTaille: (state, action) => {
      state.taille = action.payload;
    },
    setPoids: (state, action) => {
      state.poids = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    calculateImc: (state) => {
      if (state.taille > 0 && state.poids > 0) {
        const tailleInMeters = state.taille / 100;
        const imc = state.poids / (tailleInMeters * tailleInMeters);
        state.result = imc.toFixed(2);
      } else {
        state.result = null;
      }
    },
  },
});

export const { setTaille, setPoids, setGender, calculateImc } = imcSlice.actions;
export const imcReducer = imcSlice.reducer;

function Imc() {
  const dispatch = useDispatch();
  const { gender, result } = useSelector((state) => state.imc);
  const [inputTaille, setInputTaille] = useState("");
  const [inputPoids, setInputPoids] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTaille(Number(inputTaille)));
    dispatch(setPoids(Number(inputPoids)));
    dispatch(calculateImc());
  };

  return (
    <div className="container mt-5 text-center w-50">
      <div className="border rounded-3 p-4 shadow-sm ">
        <h2 className="mb-4">Calculateur d'IMC</h2>
        <form className="form-group" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="taille" className="form-label">
              <FaRulerVertical className="me-2" />
              Taille en cm:
            </label>
            <input
              type="number"
              className="form-control"
              id="taille"
              value={inputTaille}
              onChange={(e) => setInputTaille(e.target.value)}
              placeholder="Entrez votre taille"
              required
            />
          </div>

          <div className="row mb-3 align-items-center">
            <div className="col-md-4">
              <label htmlFor="Gender" className="form-label mb-0">
                {gender === "homme" ? <FaMale className="me-1" /> : <FaFemale className="me-1" />}
                Genre:
              </label>
            </div>
            <div className="col-md-4">
              <select
                id="Gender"
                className="form-select"
                value={gender}
                onChange={(e) => dispatch(setGender(e.target.value))}
              >
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </select>
            </div>
            <div className="col-md-4 text-center">
              {gender === "homme" ? (
                <img src={hommeImage} alt="Homme" className="img-fluid rounded" style={{ width: "100px" }} />
              ) : (
                <img src={femmeImage} alt="Femme" className="img-fluid rounded" style={{ width: "100px" }} />
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="Poids" className="form-label">
              <FaWeight className="me-2" />
              Poids en kg:
            </label>
            <input
              type="number"
              className="form-control"
              id="Poids"
              value={inputPoids}
              onChange={(e) => setInputPoids(e.target.value)}
              placeholder="Entrez votre poids"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Calculer
          </button>
        </form>

        {result !== null && (
          <div className="mt-4 alert alert-info">
            <strong>Résultat IMC:</strong> {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default Imc;
