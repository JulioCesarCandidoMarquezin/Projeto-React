import SelectWithMySQLDataTypes from "../SelectWithMySQLDataTypes/SelectWithMySQLDataTypes";

export default function AddForeignKey({ id, onClick, nameId, typeId }) {
  return (
    <div id={id}>
      <button
        id={id}
        onClick={() => {
          onClick(nameId, typeId);
        }}
      >
        +
      </button>
      <input id={nameId} type="text" placeholder="name" />
      <SelectWithMySQLDataTypes
        id={typeId}
        defaultValue={"char"}
      ></SelectWithMySQLDataTypes>
    </div>
  );
}
