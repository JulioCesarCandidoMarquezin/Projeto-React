import { useState } from 'react';
import './Entity.css';
import { Handle, Position } from 'reactflow';

export default function Entity(props) {
  const [attributes, setAttributes] = useState([]);
  const [foreingKeys, setForeingKeys] = useState([]);

  function addNewAttribute(nameId, typeId) {
    const name = document.getElementById(nameId);
    const type = document.getElementById(typeId);
    const newAttribute = {
      id: Date.now(),
      name: name.value,
      type: type.value,
    };
    setAttributes([...attributes, newAttribute]);
    name.value = '';
    type.value = '';
  }

  function addNewForeingKey(nameId, typeId) {
    const name = document.getElementById(nameId);
    const type = document.getElementById(typeId);
    const newForeingKey = {
      id: Date.now(),
      name: name.value,
      type: type.value,
    };
    setForeingKeys([...foreingKeys, newForeingKey]);
    name.value = '';
    type.value = '';
  }

  function deleteAttribute(id) {
    setAttributes(attributes.filter((attribute) => attribute.id !== id));
  }

  function deleteForeingKey(id) {
    setForeingKeys(foreingKeys.filter((foreingKey) => foreingKey.id !== id));
  }

  return (
    <div id="entity">
      <Handle id="top" position={Position.Top} />
      <Handle id="bottom" position={Position.Bottom} />
      <Handle id="right" position={Position.Right} />
      <Handle id="left" position={Position.Left} />

      <div id="container">
        <input
          id="entityName"
          placeholder={props.data.name}
          defaultValue={props.data.name}
        />

        <hr />

        <ul>
          {attributes.map((attribute) => {
            return (
              <li>
                <button
                  onClick={() => {
                    deleteAttribute(attribute.id);
                  }}
                >
                  X
                </button>
                <input defaultValue={attribute.name} />
                <input defaultValue={attribute.type} />
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
          {foreingKeys.map((foreingKey) => {
            return (
              <li>
                <button
                  onClick={() => {
                    deleteForeingKey(foreingKey.id);
                  }}
                >
                  X
                </button>
                <input defaultValue={foreingKey.name} />
                <input defaultValue={foreingKey.type} />
              </li>
            );
          })}
        </ul>

        <div id="newForeingKey">
          <button
            id="addNewForeingKey"
            onClick={() => {
              addNewForeingKey(
                props.data.foreingKey.nameId,
                props.data.foreingKey.typeId
              );
            }}
          >
            +
          </button>
          <input
            id={props.data.foreingKey.nameId}
            type="text"
            placeholder="name"
          />
          <input
            id={props.data.foreingKey.typeId}
            type="text"
            placeholder="type"
          />
        </div>
      </div>
    </div>
  );
}
