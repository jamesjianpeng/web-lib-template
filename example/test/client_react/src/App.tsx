import * as React from "react";
import size2_4M from "./static/size:2.4M.jpg";
import size800KB from "./static/size:800KB.jpg";
import "./App.css";

const WESURE_ENV = process.env.WESURE_ENV;
const WESURE_URL = process.env.WESURE_URL;
// const a = {}

export default function App() {
    return (
        <div>
            React App (Police base)
            <br /> WESURE_ENV = {WESURE_ENV}
            <br /> WESURE_URL = {WESURE_URL}
            <br /> test
            <img className="img" src={size2_4M} alt="" />
            <img style={{ width: "10%" }} src={size800KB} alt="" />
        </div>
    );
}
