import { useState } from "react";
import "./Entity.css";
import { Handle, Position } from "reactflow";
import AddAttribute from "../AddAttribute/AddAttribute";
import AddForeingKey from "../AddForeingKey/AddForeingKey";
import ForeingKeyList from "../ForeingKeyList/ForeingKeyList";
import AttributeList from "../AttributesList/AttributeList";
import checkInput from "../../checkInput";

export default function Entity(props) {
  const [attributes, setAttributes] = useState([]);
  const [foreingKeys, setForeingKeys] = useState([]);

  function addNewAttribute(nameId, typeId) {
    const name = document.getElementById(nameId);
    const type = document.getElementById(typeId);

    const isValid = checkInput(name.value); 

    if (isValid) {
      const newAttribute = {
        id: Date.now(),
        PK: false,
        name: name.value.trim(),
        type: type.value.trim(),
      };
      setAttributes([newAttribute]);
      name.value = "";
      type.value = "char";
    }
  }

  function addNewForeingKey(nameId, typeId) {
    const name = document.getElementById(nameId);
    const type = document.getElementById(typeId);
    if (checkIfInputIsValid(name.value)) {
      const newForeingKey = {
        id: Date.now(),
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
    attributes.map((attribute) =>
      attribute.id === id ? (attribute.PK = true) : (attribute.PK = false)
    );
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

        <AttributeList
          changePK={changePK}
          components={attributes}
          onClick={deleteAttribute}
        ></AttributeList>

        <AddAttribute
          id={"newAttribute"}
          onClick={addNewAttribute}
          nameId={props.data.attribute.nameId}
          typeId={props.data.attribute.typeId}
        ></AddAttribute>

        <hr />

        <ForeingKeyList
          havePK={false}
          components={foreingKeys}
          onClick={deleteForeingKey}
        ></ForeingKeyList>

        <AddForeingKey
          id={"newForeingKey"}
          onClick={addNewForeingKey}
          nameId={props.data.foreingKey.nameId}
          typeId={props.data.foreingKey.typeId}
        ></AddForeingKey>
      </div>
    </div>
  );
}
