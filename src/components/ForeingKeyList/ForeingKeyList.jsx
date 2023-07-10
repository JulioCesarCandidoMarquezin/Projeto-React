import SelectWithMySQLDataTypes from "../SelectWithMySQLDataTypes/SelectWithMySQLDataTypes";

export default function ForeingKeyList({ components, onClick }) {
  return (
    <ul>
      {components.map((component) => {
        return (
          <li key={component.id}>
            <button
              onClick={() => {
                onClick(component.id);
              }}
            >
              X
            </button>
            <input defaultValue={component.name} />
            <SelectWithMySQLDataTypes
              defaultValue={component.type}
            ></SelectWithMySQLDataTypes>
          </li>
        );
      })}
    </ul>
  );
}
