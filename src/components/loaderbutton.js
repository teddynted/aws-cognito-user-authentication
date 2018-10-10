import React from "react";
import "./loaderbutton.css";

export default ({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  ...props
}) =>
  <button
    className={`LoaderButton bg-dark text-white btn btn-default ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading}
    {!isLoading ? text : loadingText}
  </button>;