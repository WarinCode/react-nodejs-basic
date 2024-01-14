import React , { createContext , useState , useEffect , useId } from 'react'
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import Content from './components/Content';
import axios from "axios"
import Card from './components/Card';

const App = () => {
  const [data , setData] = useState(["1" , "2" ,"3"]);
  console.log(import.meta.env);

  return (
    <>
      {data.map((v,idx) => {
        console.log(useId());
        return <Card val={v} key={useId()}/>
      })}
      {data.map((v,idx) => {
        console.log(useId());
        return <Card val={v} key={useId()}/>
      })}
    </>
  )
}

export default App;