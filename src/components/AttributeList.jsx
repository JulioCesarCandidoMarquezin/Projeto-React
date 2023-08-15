/* eslint-disable react/prop-types */
import SelectWithMySQLDataTypes from "./SelectWithMySQLDataTypes";

export default function AttributeList({ changePrimaryKey, setAttributes, attributes, onClick }) {
  return (
    <ul>
      {attributes.map((attribute) => {
        return (
          <li key={attribute.id}>
            <button
              onClick={() => {
                changePrimaryKey(attribute.id, setAttributes, attributes);
              }}
            >
              X
            </button>

            <button
              onClick={() => {
                onClick(attribute.id, setAttributes, attributes);
              }}
            >
              X
            </button>
            <input defaultValue={attribute.name} />
            <SelectWithMySQLDataTypes
              defaultValue={attribute.type}
            ></SelectWithMySQLDataTypes>
          </li>
        );
      })}
    </ul>
  );
}
