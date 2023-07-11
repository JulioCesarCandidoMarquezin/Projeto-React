import { useEffect, useState } from "react";
import "./Entity.css";
import { Handle, Position } from "reactflow";
import AddAttribute from "../AddAttribute/AddAttribute";
import AddForeignKey from "../AddForeignKey/AddForeignKey";
import ForeignKeyList from "../ForeignKeyList/ForeignKeyList";
import AttributeList from "../AttributesList/AttributeList";
import checkInput from "../../verifications/checkInput";
import existElementWithDuplicatedName from "../../verifications/existElementWithDuplicatedName";

export default function Entity(props) {
  const [name, setName] = useState(props.data.name);
  const [attributes, setAttributes] = useState([]);
  const [foreignKeys, setForeignKeys] = useState([]);

  useEffect(() => {
    props.data.childToParent({
      name: name,
      attributes: attributes,
      foreignKeys: foreignKeys,
    });
  }, [name, attributes, foreignKeys]);

  function addNewAttribute(nameId, typeId) {
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

  function addNewForeignKey(nameId, typeId) {
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

  function deleteAttribute(id) {
    setAttributes(attributes.filter((attribute) => attribute.id !== id));
  }

  function deleteForeignKey(id) {
    setForeignKeys(foreignKeys.filter((foreignKey) => foreignKey.id !== id));
  }

  function changePrimaryKey(id) {
    setAttributes((prevAttributes) =>
      prevAttributes.map((attribute) => {
        if (attribute.id === id) {
          return { ...attribute, PK: true };
        }
        return { ...attribute, PK: false };
      })
    );
  }

  function changeName(e) {
    setName(e.target.value);
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
          onChange={changeName}
          value={name}
        />

        <hr />

        <AttributeList
          changePrimaryKey={changePrimaryKey}
          components={attributes}
          onClick={deleteAttribute}
        />

        <AddAttribute
          id={"newAttribute"}
          onClick={addNewAttribute}
          nameId={props.data.attribute.nameId}
          typeId={props.data.attribute.typeId}
        />

        <hr />

        <ForeignKeyList
          havePK={false}
          components={foreignKeys}
          onClick={deleteForeignKey}
        />

        <AddForeignKey
          id={"newForeignKey"}
          onClick={addNewForeignKey}
          nameId={props.data.foreignKey.nameId}
          typeId={props.data.foreignKey.typeId}
        />
      </div>
    </div>
  );
}
