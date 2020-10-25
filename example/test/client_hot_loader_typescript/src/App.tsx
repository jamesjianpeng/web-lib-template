import { hot } from 'react-hot-loader/root'
import * as React from 'react'
import Counter from './Counter'
import size2_4M from './static/size:2.4M.jpg'
import size800KB from "./static/size:800KB.jpg";
import style from './App.css'
import './App.css'
const App = () => (
  <h1>
    React App (Police base)
    <br />
    You can update this text, and it will work
    <Counter />
    <img className={style.img} src={size2_4M} alt="" />
    <img className="cursor" style={{ width: "10%" }} src={size800KB} alt="" />
  </h1>
)

export default hot(App)
