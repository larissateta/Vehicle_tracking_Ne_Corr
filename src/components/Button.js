import React from "react";


const Button = ({onClick, type, width, text, ...otherProps }) =>{
    return (
        <button type={type} onClick={onClick} style={{width: `${width}%`}} className="btn">{text}</button>
    )
}

export default Button