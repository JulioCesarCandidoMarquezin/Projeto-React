export default function SelectWithMySQLDataTypes({ id, defaultValue }) {
    return (
      <select id={id} defaultValue={defaultValue}>
        <option value="char">Char</option>
        <option value="varchar">Varchar</option>
        <option value="tinytext">Tinytext</option>
        <option value="text">Text</option>
        <option value="blob">Blob</option>
        <option value="mediumtext">MediumText</option>
        <option value="mediumblob">MediumBlob</option>
        <option value="tinyint">TinyInt</option>
        <option value="smallint">SmallInt</option>
        <option value="mediumint">MediumInt</option>
        <option value="int">Int</option>
        <option value="bigint">BigInt</option>
        <option value="float">Float</option>
        <option value="double">Double</option>
        <option value="decimal">Decimal</option>
        <option value="date">Date</option>
        <option value="datetime">DateTime</option>
        <option value="timestamp">TimeStamp</option>
        <option value="time">Time</option>
        <option value="boolean">Boolean</option>
      </select>
    );
}