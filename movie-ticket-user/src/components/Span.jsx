import React from "react";

const Span = ({
    className,
    onClick,
    style,
    id,
    text
}) => {
    return(
        <span
            className={className}
            onClick={onClick}
            style={style}
            id={id}>
            {text}
        </span>
    );
};

export default Span;