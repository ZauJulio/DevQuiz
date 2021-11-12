import React from "react";

import "./styles.scss";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  borderRadius?: string;
  color?: string;
  width?: string;
  height?: string;
  children?: React.ReactNode;
}

function Button(props: ButtonProps) {
  const { borderRadius, className, color, children, width, height, ...rest } =
    props;

  return (
    <button
      {...rest}
      className={`btn ${className ?? ""}`}
      style={{
        background: color ?? "#bd93f9",
        borderRadius: borderRadius ?? "10px",
        width: width ?? "auto",
        height: height ?? "auto",
      }}
    >
      {children}
    </button>
  );
}

export default Button;
