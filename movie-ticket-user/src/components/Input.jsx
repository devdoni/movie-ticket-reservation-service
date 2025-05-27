import React from "react";

const Input = ({
    type = "text",
    name,
    value,
    placeholder,
    id,
    className,
    disabled,
    min,
    onChange,
    onInput,
    maxLength,
    onBlur,
    onClick,
    ref,
    checked
}) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            id={id}
            disabled={disabled}
            onChange={onChange}
            onClick={onClick}
            onInput={onInput}
            className={className}
            min={min}
            max={maxLength}
            onBlur={onBlur}
            ref={ref}
            checked={checked}
        />
    );
}
export default Input;