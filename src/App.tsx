import React from 'react';
import './App.css';
import GhibliFilm from './components/ghiblifilm';
import { IGhibliFilm } from './components/interface-ghiblifilm';

function App() {

    const testFilm: IGhibliFilm = {
      id: "1",
      title: "test film",
      image: "Image.jpg",
      description: "description",
      director: "director",
      release_date: "release date",
      running_time: "running time",
      rt_score: "rating score",     
    }


  return (
    <GhibliFilm film={testFilm} />
  );
}

export default App;
