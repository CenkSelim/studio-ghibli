import React, { useEffect, useState } from 'react';
import './App.css';
import GhibliFilm from './components/ghiblifilm';


function App() {

  const [load,setLoad]=useState<boolean>(true);
  const [ghibliTitle, setGhibliTitle] = useState<string>('');

  useEffect(() => {
    if (load) {
	    fetchMovies(1);
      setLoad(false);   }
  }, [load]);
 
  // left this here as I was testing axios as well
  // const fetchMovies = async (numberOffilms : number) => {
  //   const apiResponse = await axios.get(`https://ghibliapi.herokuapp.com/films?limit=${numberOffilms}&fields=id,title`);
  //   setGhibli(apiResponse.data[0].title);
  // };
 
  const fetchMovies = async (numberOffilms : number) => {
    try {
      const response = await fetch(`https://ghibliapi.herokuapp.com/films?limit=${numberOffilms}&fields=id,title`);
     
      if (response.status === 200){
        const movies = await response.json();
        const apiResponse  = await JSON.parse(JSON.stringify(movies));
        setGhibliTitle(apiResponse[0].title);
      }     
           
      if (response.status === 500){
          setGhibliTitle("Oops… something went wrong, try again 🤕");
      }

      if (response.status === 418){
          setGhibliTitle("418 I'm a tea pot 🫖, silly");
      }

    } catch (error) {
       setGhibliTitle("Something horrible has happend to the api call");
    }
  }

  return (
    <GhibliFilm title={ghibliTitle} />
  );
}

export default App;
