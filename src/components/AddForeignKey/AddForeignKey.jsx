import SelectWithMySQLDataTypes from "../SelectWithMySQLDataTypes/SelectWithMySQLDataTypes";

export default function AddForeignKey({
  id,
  onClick,
  nameId,
  typeId,
  setForeignKeys,
  foreignKeys,
}) {
  return (
    <div id={id}>
      <button
        id={id}
        onClick={() => {
          onClick(nameId, typeId, setForeignKeys, foreignKeys);
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
