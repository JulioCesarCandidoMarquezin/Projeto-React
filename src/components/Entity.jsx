/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../styles/Entity.css";
import { Handle, Position } from "reactflow";
import AddAttribute from "./AddAttribute";
import AddForeignKey from "./AddForeignKey";
import ForeignKeyList from "./ForeignKeyList";
import AttributeList from "./AttributeList";
import checkInput from "../verifications/checkInput";
import existElementWithDuplicatedName from "../verifications/existElementWithDuplicatedName";

function addNewAttribute(nameId, typeId, setAttributes, attributes) {
  const name = document.getElementById(nameId);
  const type = document.getElementById(typeId);

  const isValid =
    checkInput(name.value) &&
    !existElementWithDuplicatedName(attributes, name.value);

  if (isValid) {
    const newAttribute = {
      id: Date.now(),
      PK: false,
      name: name.value.trim(),
      type: type.value.trim(),
    };

    setAttributes([...attributes, newAttribute]);
    name.value = "";
    type.value = "char";
  }
}

function addNewForeignKey(nameId, typeId, setForeignKeys, foreignKeys) {
  const name = document.getElementById(nameId);
  const type = document.getElementById(typeId);

  const isValid = checkInput(name.value);

  if (isValid) {
    const newForeignKey = {
      id: Date.now(),
      name: name.value.trim(),
      type: type.value.trim(),
    };

    setForeignKeys([...foreignKeys, newForeignKey]);
    name.value = "";
    type.value = "char";
  }
}

function deleteAttribute(id, setAttributes, attributes) {
  setAttributes(attributes.filter((attribute) => attribute.id !== id));
}

function deleteForeignKey(id, setForeignKeys, foreignKeys) {
  setForeignKeys(foreignKeys.filter((foreignKey) => foreignKey.id !== id));
}

function changePrimaryKey(id, setAttributes, attributes) {
  setAttributes(() =>
    attributes.map((attribute) => {
      if (attribute.id === id) {
        return { ...attribute, PK: true };
      }
      return { ...attribute, PK: false };
    })
  );
}

function changeName(event, setName) {
  const value = event.target.value;
  if (value.match(/^[a-zA-Z][a-zA-Z0-9_]{0,29}$/) || value === "") setName(value);
}

export default function Entity(props) {
  const [name, setName] = useState(props.data.name);
  const [attributes, setAttributes] = useState([]);
  const [foreignKeys, setForeignKeys] = useState([]);

  useEffect(() => {
    const newEntity = {
      id: props.id,
      name: name,
      attributes: attributes,
      foreignKeys: foreignKeys,
    };

    props.data.updateEntity(newEntity);
  }, [name, attributes, foreignKeys]);

  return (
    <div id={props.id} className="entity">
      <Handle id="top" position={Position.Top} />
      <Handle id="bottom" position={Position.Bottom} />
      <Handle id="right" position={Position.Right} />
      <Handle id="left" position={Position.Left} />

      <div id="container">
        <input
          id="entityName"
          autoComplete="false"
          placeholder="Entity"
          onChange={(event) => changeName(event, setName)}
          value={name}
        />

        <hr />

        <AttributeList
          changePrimaryKey={changePrimaryKey}
          setAttributes={setAttributes}
          attributes={attributes}
          onClick={deleteAttribute}
        />

        <AddAttribute
          id={"newAttribute"}
          onClick={addNewAttribute}
          nameId={props.data.attribute.nameId}
          typeId={props.data.attribute.typeId}
          setAttributes={setAttributes}
          attributes={attributes}
        />

        <hr />

        <ForeignKeyList
          havePK={false}
          setForeignKeys={setForeignKeys}
          foreignKeys={foreignKeys}
          onClick={deleteForeignKey}
        />

        <AddForeignKey
          id={"newForeignKey"}
          onClick={addNewForeignKey}
          nameId={props.data.foreignKey.nameId}
          typeId={props.data.foreignKey.typeId}
          setForeignKeys={setForeignKeys}
          foreignKeys={foreignKeys}
        />
      </div>
    </div>
  );
}
