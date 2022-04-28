import { IGhibliFilm } from "./interface-ghiblifilm";

interface GhibliFilmProps {
    film:IGhibliFilm;
}

const GhibliFilm : React.FC<GhibliFilmProps> = ({film}) => {

    console.log(film);
    return (

        <p> title: {film.title}</p>

    )
};

export default  GhibliFilm;