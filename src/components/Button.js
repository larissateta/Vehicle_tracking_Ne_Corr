import React from "react";


const Button = ({onClick, type, width, text, ...otherProps }) =>{
    return (
        <button type={type} onClick={onClick} style={{width: `${width}%`}} className="button">{text}</button>
    )
}

export default Button