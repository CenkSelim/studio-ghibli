import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import GhibliFilm from './components/ghiblifilm';
import { IGhibliFilm } from './components/interface-ghiblifilm';

function App() {

  const [load,setLoad]=useState<boolean>(true);
  const [ghibliTitle, setGhibliTitle] = useState<string>('');

  useEffect(() => {
    if (load) {
	    fetchMovies(1);
      setLoad(false);   }
  }, []);
 
  // left this here as I was testing axios as well
  // const fetchMovies = async (numberOffilms : number) => {
  //   const apiResponse = await axios.get(`https://ghibliapi.herokuapp.com/films?limit=2&fields=id,title`);
  //   setGhibli(apiResponse.data[0].title);
  // };
 
  const fetchMovies = async (numberOffilms : number) => {
    const response = await fetch(`https://ghibliapi.herokuapp.com/films?limit=2&fields=id,title`);
    const movies = await response.json();
    const apiResponse  = await JSON.parse(JSON.stringify(movies));
    setGhibliTitle(apiResponse[0].title);
  }

  return (
    <GhibliFilm title={ghibliTitle} />
  );
}

export default App;
