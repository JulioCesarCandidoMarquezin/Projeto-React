/* eslint-disable react/prop-types */
import SelectWithMySQLDataTypes from "./SelectWithMySQLDataTypes";

export default function AddAttribute({ id, onClick, nameId, typeId, setAttributes, attributes }) {
  return (
    <div id={id}>
      <button
        id={id}
        onClick={() => {
          onClick(nameId, typeId, setAttributes, attributes);
        }}
      >
        +
      </button>
      <input id={nameId} type="text" placeholder="name" autoComplete='false' />
      <SelectWithMySQLDataTypes
        id={typeId}
        defaultValue={"char"}
      ></SelectWithMySQLDataTypes>
    </div>
  );
}
