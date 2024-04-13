import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({liberyStatus,setLiberyStatus}) => {
    const handleClick = () => {
        setLiberyStatus(!liberyStatus)
    }
    return(
        <nav>
            <h1 className="playerName">Waves</h1>
            <button onClick={handleClick}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    )

    
}

export default Nav;