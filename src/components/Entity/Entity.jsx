import { useState } from "react";
import "./Entity.css";
import { Handle, Position } from "reactflow";

export let Entitys = []

function SelectWithMySQLDataTypes({ type }) {
  return (
    <select defaultValue={type}>
      <option value="char">Char</option>
      <option value="varchar">Varchar</option>
      <option value="tinytext">Tinytext</option>
      <option value="text">Text</option>
      <option value="blob">Blob</option>
      <option value="mediumtext">MediumText</option>
      <option value="mediumblob">MediumBlob</option>
      <option value="tinyint">TinyInt</option>
      <option value="smallint">SmallInt</option>
      <option value="mediumint">MediumInt</option>
      <option value="int">Int</option>
      <option value="bigint">BigInt</option>
      <option value="float">Float</option>
      <option value="double">Double</option>
      <option value="decimal">Decimal</option>
      <option value="date">Date</option>
      <option value="datetime">DateTime</option>
      <option value="timestamp">TimeStamp</option>
      <option value="time">Time</option>
      <option value="boolean">Boolean</option>
    </select>
  );
}

function ComponentList({ components, onClick }) {
  return (
    <ul>
      {components.map((component) => {
        return (
          <li>
            <button
              onClick={() => {
                onClick(component.id);
              }}
            >
              X
            </button>
            <input defaultValue={component.name} />
            <SelectWithMySQLDataTypes
              type={component.type}
            ></SelectWithMySQLDataTypes>
          </li>
        );
      })}
    </ul>
  );
}

function AddNewComponetList({ id, onClick, nameId, typeId }) {
  return (
    <div id="newForeingKey">
      <button
        id={id}
        onClick={() => {
          onClick(nameId, typeId);
        }}
      >
        +
      </button>
      <input id={nameId} type="text" placeholder="name" />
      <select id={typeId}>
        <option value="char">Char</option>
        <option value="varchar">Varchar</option>
        <option value="tinytext">Tinytext</option>
        <option value="text">Text</option>
        <option value="blob">Blob</option>
        <option value="mediumtext">MediumText</option>
        <option value="mediumblob">MediumBlob</option>
        <option value="tinyint">TinyInt</option>
        <option value="smallint">SmallInt</option>
        <option value="mediumint">MediumInt</option>
        <option value="int">Int</option>
        <option value="bigint">BigInt</option>
        <option value="float">Float</option>
        <option value="double">Double</option>
        <option value="decimal">Decimal</option>
        <option value="date">Date</option>
        <option value="datetime">DateTime</option>
        <option value="timestamp">TimeStamp</option>
        <option value="time">Time</option>
        <option value="boolean">Boolean</option>
      </select>
    </div>
  );
}

function checkIfInputIsValid(input) {
  return !(
    input === null ||
    input === undefined ||
    input.trim() === "" ||
    !/^[A-Za-z0-9_$]+$/.test(input)
  );
}

export default function Entity(props) {
  /* 
  Colocar o atributo PRIMARY KEY nos atributos, 
  colocar um botão do lado pra escolher se ele vai ou não ser PRIMARY KEY,
  se um for definido os outros ficam com o atributo como FALSE
  */
  const [attributes, setAttributes] = useState([]);
  const [foreingKeys, setForeingKeys] = useState([]);

  Entitys = [...Entitys, {
    id: props.id,
    name: props.name,
    attributes: [attributes],
    foreingKeys: [foreingKeys],
  }, ]

  function addNewAttribute(nameId, typeId) {
    const name = document.getElementById(nameId);
    const type = document.getElementById(typeId);
    if (
      checkIfInputIsValid(name.value)
    ) {
      const newAttribute = {
        id: props.data.attribute.id + Date.now(),
        PK: false,
        name: name.value.trim(),
        type: type.value.trim(),
      };
      setAttributes([...attributes, newAttribute]);
      name.value = "";
      type.value = "char";
    }
  }

  function addNewForeingKey(nameId, typeId) {
    const name = document.getElementById(nameId);
    const type = document.getElementById(typeId);
    if (checkIfInputIsValid(name.value)) {
      const newForeingKey = {
        id: props.data.foreingKey.id + Date.now(),
        name: name.value.trim(),
        type: type.value.trim(),
      };
      setForeingKeys([...foreingKeys, newForeingKey]);
      name.value = "";
      type.value = "char";
    }
  }

  function deleteAttribute(id) {
    setAttributes(attributes.filter((attribute) => attribute.id !== id));
  }

  function deleteForeingKey(id) {
    setForeingKeys(foreingKeys.filter((foreingKey) => foreingKey.id !== id));
  }

  function changePK(id) {
    setAttributes(attributes.map((attribute) => (attribute.id === id) ? attribute.PK = true : attribute.PK = false))
  }

  return (
    <div id={props.id} className="entity">
      <Handle id="top" position={Position.Top} />
      <Handle id="bottom" position={Position.Bottom} />
      <Handle id="right" position={Position.Right} />
      <Handle id="left" position={Position.Left} />

      <div id="container">
        <input
          id="entityName"
          placeholder="Entity"
          defaultValue={props.data.name}
        />

        <hr />

        <ComponentList
          components={attributes}
          onClick={deleteAttribute}
        ></ComponentList>

        <AddNewComponetList
          id={"newAttribute"}
          onClick={addNewAttribute}
          nameId={props.data.attribute.nameId}
          typeId={props.data.attribute.typeId}
        ></AddNewComponetList>

        <hr />

        <ComponentList
          components={foreingKeys}
          onClick={deleteForeingKey}
        ></ComponentList>

        <AddNewComponetList
          id={"newForeingKey"}
          onClick={addNewForeingKey}
          nameId={props.data.foreingKey.nameId}
          typeId={props.data.foreingKey.typeId}
        ></AddNewComponetList>
      </div>
    </div>
  );
}
