import { getDataBaseName } from "./components/Header";

export default function createSQLCode(entitys) {
  console.log('Log das entitys recebidas pelo createSQLCode ' + entitys)
  let SQLCode = "";
  console.log(entitys)
  SQLCode += createDataBase();
  SQLCode += createTables(entitys);
  navigator.clipboard.writeText(SQLCode);
  alert(SQLCode);
  return SQLCode;
}

function createDataBase() {
  let dataBaseCode = `CREATE DATABASE ${getDataBaseName()}; \n`;
  let dataBaseName =
    getDataBaseName() !== "" ? getDataBaseName() : "dataBaseName";
  dataBaseCode = dataBaseCode.concat(`USE ${dataBaseName}; \n`);
  return dataBaseCode;
}

function createTables(entitys) {
  console.log('Log das entitys recebidas pelo createTables ' + entitys)
  let tablesCode = "";
  entitys.forEach((entity) => {
    const hasAttributes = entity.attributes && entity.attributes.length > 0;
    const hasForeignKeys = entity.foreignKeys && entity.foreignKeys.length > 0;
    if (hasAttributes || hasForeignKeys) {
      const attributesCode = createAttributesCode(entity.attributes);
      const tableCode = `CREATE TABLE ${entity.name} (\n${attributesCode});\n`;
      tablesCode += tableCode;
    }
    console.log(tablesCode);
  });

  return tablesCode;
}

function createAttributesCode(attributes) {
  console.log('Log dos attributes recebidos pelo createAttrbiutesCode ' + attributes)
  const attributesCode = attributes.map((attribute) => {
    const primaryKey = attribute.PK ? "PRIMARY KEY " : "";
    return `${attribute.name} ${attribute.type} ${primaryKey}`;
  });

  return attributesCode.join(",\n");
}

function createForeingKeys(entitys) {
  
}
