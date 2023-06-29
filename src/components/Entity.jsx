import React, { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';
import './Entity.css';

export default function Entity(props) {
  const [attributes, setAttributes] = useState([]);
  const [foreingKeys, setForeingKeys] = useState([]);

  useEffect(() => {}, [attributes]);

  useEffect(() => {}, [foreingKeys]);

  function addNewAttribute() {
    const newAttribute = 'new attribute';
    setAttributes([...attributes, newAttribute]);
  }

  function addNewForeingKey() {
    const newForeingKey = 'new foreign key';
    setForeingKeys([...foreingKeys, newForeingKey]);
  }

  return (
    <div id={'Entity'}>
      <label>{props.name}</label>

      <hr />

      <ul>
        {attributes.map((attribute, index) => {
          return <li key={index}>{attribute}</li>;
        })}
      </ul>

      <button id={'addNewAttribute'} onClick={addNewAttribute}>
        + Adicionar novo atributo
      </button>

      <hr />

      <ul>
        {foreingKeys.map((foreingKey, index) => {
          return <li key={index}>{foreingKey}</li>;
        })}
      </ul>

      <button id={'addNewForeingKey'} onClick={addNewForeingKey}>
        + Adicionar nova chave estrangeira
      </button>
    </div>
  );
}
