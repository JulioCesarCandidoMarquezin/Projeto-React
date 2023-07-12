import SelectWithMySQLDataTypes from "../SelectWithMySQLDataTypes/SelectWithMySQLDataTypes";

export default function ForeingKeyList({ setForeignKeys, foreignKeys, onClick }) {
  return (
    <ul>
      {foreignKeys.map((foreignKey) => {
        return (
          <li key={foreignKey.id}>
            <button
              onClick={() => {
                onClick(foreignKey.id, setForeignKeys, foreignKeys);
              }}
            >
              X
            </button>
            <input defaultValue={foreignKey.name} />
            <SelectWithMySQLDataTypes
              defaultValue={foreignKey.type}
            ></SelectWithMySQLDataTypes>
          </li>
        );
      })}
    </ul>
  );
}
