import { useEffect, useState } from 'react';
import './Entity.css';
import { Handle, Position } from 'reactflow';

export default function Entity(props) {
  const [attributes, setAttributes] = useState([]);
  const [foreingKeys, setForeingKeys] = useState([]);

  useEffect(() => {}, [attributes]);

  useEffect(() => {}, [foreingKeys]);

  function addNewAttribute() {
    const newAttribute = "sla";
    setAttributes([...attributes, newAttribute]);
  }

  function addNewForeingKey() {
    const newForeingKey = 'new foreign key';
    setForeingKeys([...foreingKeys, newForeingKey]);
  }

  return (
    <div id={'entity'}>
      <Handle 
      id='Top' 
       
      position={Position.Top}
      />
      <Handle 
      id='Bottom' 
       
      position={Position.Bottom}
      />
      <Handle 
      id='Right' 
       
      position={Position.Right}
      />
      <Handle 
      id='Left' 
       
      position={Position.Left}
      />

      <div id='container'>
      <label>{props.data.name}</label>

<hr />

<ul>
  {attributes.map((attribute, index) => {
    return <li key={index}>{attribute}:<label></label></li>;
  })}
</ul>

<div id='newAttribute'>
  <button id={'addNewAttribute'} onClick={addNewAttribute}>+</button>
  <input id='name' type='text' placeholder='name'></input>
  <input id='type' type='text' placeholder='type'></input>
</div>

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
      
    </div>
  );
}
