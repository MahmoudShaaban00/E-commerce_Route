import React, { useEffect, useState, useContext } from 'react';
import Style from './Home.module.css';
import { CounterContext } from '../../context/CounterContext';
import RecentProducts from '../../components/RecentProducts/RecentProducts';
import CategoriesSlider from '../../components/CategoriesSlider/CategoriesSlider';
import MainSlider from "../../components/MainSlider/MainSlider";


export default function Home() {
    useEffect(()=>{

    } , []);

    let {counter , userName , setCounter} = useContext(CounterContext)

  return <>
  <MainSlider/>
    <CategoriesSlider/>
  <RecentProducts/>
  </>
}
