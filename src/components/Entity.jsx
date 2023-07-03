import { useState } from 'react';
import './Entity.css';
import { Handle, Position } from 'reactflow';

export default function Entity(props) {
  const [attributes, setAttributes] = useState([]);
  const [foreingKeys, setForeingKeys] = useState([]);

  function addNewAttribute(nameId, typeId) {
    const name = document.getElementById({ nameId });
    const type = document.getElementById({ typeId });
    const newAttribute = `${name}: ${type}`;
    setAttributes([...attributes, newAttribute]);
  }

  function addNewForeingKey(nameId, typeId) {
    const name = document.getElementById({ nameId });
    const type = document.getElementById({ typeId });
    const newForeingKey = `${name}: ${type}`;
    setForeingKeys([...foreingKeys, newForeingKey]);
  }

  return (
    <div id="entity">
      <Handle id="top" position={Position.Top} />
      <Handle id="bottom" position={Position.Bottom} />
      <Handle id="right" position={Position.Right} />
      <Handle id="left" position={Position.Left} />

      <div id="container">
        <input id="entityName" placeholder={props.data.name}></input>

        <hr />

        <ul>
          {attributes.map((attribute, index) => {
            return (
              <li key={index}>
                <button>X</button>
                <input>{attribute.name}</input>
                <input>{attribute.type}</input>
              </li>
            );
          })}
        </ul>

        <div id="newAttribute">
          <button
            id="addNewAttribute"
            onClick={() => {
              addNewAttribute(
                props.data.attribute.nameId,
                props.data.attribute.typeId
              );
            }}
          >
            +
          </button>
          <input
            id={props.data.attribute.nameId}
            type="text"
            placeholder="name"
          />
          <input
            id={props.data.attribute.typeId}
            type="text"
            placeholder="type"
          />
        </div>

        <hr />

        <ul>
          {foreingKeys.map((foreingKey, index) => {
            return (
              <li key={index}>
                <input>{foreingKey.name}</input>
                <input>{foreingKey.type}</input>
              </li>
            );
          })}
        </ul>

        <button id="addNewForeingKey" onClick={addNewForeingKey}>
          + Adicionar nova chave estrangeira
        </button>
      </div>
    </div>
  );
}
