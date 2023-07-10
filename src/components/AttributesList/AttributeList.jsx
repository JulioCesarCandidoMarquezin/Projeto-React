import SelectWithMySQLDataTypes from "../SelectWithMySQLDataTypes/SelectWithMySQLDataTypes";

export default function AttributeList({ changePrimaryKey, components, onClick }) {
  return (
    <ul>
      {components.map((component) => {
        return (
          <li key={component.id}>
            <button
              onClick={() => {
                changePrimaryKey(component.id);
              }}
            >
              X
            </button>

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
