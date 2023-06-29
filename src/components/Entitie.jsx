import React, { useEffect, useState } from 'react';
import './entitie.css';

export default function Entitie(props) {
  const [attributes, setAttributes] = useState([]);
  const [foreingKeys, setForeingKeys] = useState([]);

  useEffect(() => {
    attributes = [...attributes, newAttribute];
  }, [attributes]);

  useEffect(() => {
    attributes = [...foreingKeys, newForeingKeys];
  }, [foreingKeys]);

  function addNewAttributes() {
    const newAttributes = attributes.map((attribute) => {
      return { ...attributes };
    });
    setAttributes(newAttributes);
  }

  function addNewAttributes() {}

  return (
    <div id={'entity'}>
      <label>{props.name}</label>

      <hr />

      <ul>
        {attributes.map((attribute) => {
          return <li>atributos</li>;
        })}
      </ul>

      <button id={'addNewAttribute'} onClick={addNewAttribute()}>
        Adicionar novo atributo
      </button>

      <hr />

      <ul>
        {foreingKeys.map((foreingKey) => {
          return <li style={{ listStyle: 'none' }}>chaves estrangeiras</li>;
        })}
      </ul>

      <button id={'addNewForeingKey'} onClick={addNewForeingKey()}>
        Adicionar nova chave estrangeira
      </button>
    </div>
  );
}
