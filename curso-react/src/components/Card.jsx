import "./Card.css";
import { Link } from "react-router-dom";

function Card({title = "Título por defecto", description = "Descripción por defecto"}){
    return (<div className="Card">
        <Link to={title}><h2>{title}</h2></Link>
        <p>{description}</p>
    </div>
    );
}

export default Card;