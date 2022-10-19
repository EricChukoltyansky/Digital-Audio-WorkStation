import React from 'react';
import { GiDrumKit, GiGuitarBassHead } from "react-icons/gi";
import { CgPiano } from "react-icons/cg";
import "./LeftIconBar.css";


export default function LeftIconBar() {
  return (
    <div className='LeftIconBar'>
      <h1 className='icon piano'><CgPiano/></h1>
      <h1 className='icon guitar'><GiGuitarBassHead/></h1>
      <h1 className='icon drums'><GiDrumKit/></h1>
    </div>
  )
}