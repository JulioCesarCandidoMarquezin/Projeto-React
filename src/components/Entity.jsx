import { useEffect, useState } from 'react';
import './Entity.css';
import { Handle, Position } from 'reactflow';

export default function Entity(props) {
  const [attributes, setAttributes] = useState([]);
  const [foreingKeys, setForeingKeys] = useState([]);

  useEffect(() => {}, [attributes]);

  useEffect(() => {}, [foreingKeys]);

  /* 
    Erro: todos os inpus tem o mesmo id, sendo assim, 
    é pego o valor só do campo da entidade original,
    deve-se ser passado algum atributo que sirva de id
    para os campos na hora de criar a entidade. 
  */

  function addNewAttribute() {
    const name = document.getElementById({props.data.nameId}).value;
    const type = document.getElementById({props.data.typeId}).value;
    const newAttribute = `${name}: ${type}`;
    setAttributes([...attributes, newAttribute]);
  }

  function addNewForeingKey() {
    const newForeingKey = 'new foreign key';
    setForeingKeys([...foreingKeys, newForeingKey]);
  }

  return (
    <div id="entity">
      <Handle id="top" position={Position.Top} />
      <Handle id="bottom" position={Position.Bottom} />
      <Handle id="right" position={Position.Right} />
      <Handle id="left" position={Position.Left} />

      <div id="container">
        <label>{props.data.name}</label>

        <hr />

        <ul>
          {attributes.map((attribute, index) => {
            return (
              <li key={index}>
                <button>X</button>{attribute}
              </li>
            );
          })}
        </ul>

        <div id="newAttribute">
          <button id="addNewAttribute" onClick={addNewAttribute}>
            +
          </button>
          <input id="name" type="text" placeholder="name" />
          <input id="type" type="text" placeholder="type" />
        </div>

        <hr />

        <ul>
          {foreingKeys.map((foreingKey, index) => {
            return <li key={index}>{foreingKey}</li>;
          })}
        </ul>

        <button id="addNewForeingKey" onClick={addNewForeingKey}>
          + Adicionar nova chave estrangeira
        </button>
      </div>
    </div>
  );
}
