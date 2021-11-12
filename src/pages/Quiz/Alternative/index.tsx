import React from "react";

import "./styles.scss";

interface AlternativeProps {
  value: string;
  answer: string;
  onSelect: (answer: string) => void;
  selected: boolean;
}

function Alternative(props: AlternativeProps) {
  const getAlternativeLabel = (answer: any) => {
    return answer.slice(-1).toUpperCase();
  };

  return (
    <li key={props.answer} className={"alternative-container"}>
      <label className={props.selected ? "checked" : ""}>
        <span className={"alternative-letter"}>
          {getAlternativeLabel(props.answer)}
        </span>

        <input
          type="radio"
          name={props.answer}
          checked={props.selected}
          onChange={() => props.onSelect(props.answer)}
        />

        <span className={"alternative-text"}>{props.value}</span>
      </label>
    </li>
  );
}

export default Alternative;
