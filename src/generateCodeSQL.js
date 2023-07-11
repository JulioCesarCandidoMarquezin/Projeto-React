import { getDataBaseName } from "./components/Header/Header";

export default function createSQLCode(entitys) {
  let SQLCode = "";
  SQLCode = SQLCode.concat(createDataBase());
  SQLCode = SQLCode.concat(createTables(entitys));
  navigator.clipboard.writeText(SQLCode);
  alert("Texto copiado para a área de transferência");
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
  let tablesCode = "";
  entitys.forEach((entity) => {
    if (entity.attributes || entity.foreignKeys) {
      tablesCode = tablesCode.concat(
        `CREATE TABLE ${entity.name} (\n${createAttributes(
          entity.attributes
        )});\n`
      );
    }
  });
  return tablesCode;
}

function createAttributes(attributes) {
  const attributesCode = attributes.map((attribute) => {
    const primaryKey = attribute.PK ? "PRIMARY KEY " : "";
    return `${attribute.name} ${attribute.type} ${primaryKey}`;
  });

  return attributesCode.join(",\n");
}

function createAssociationTable() {}

function relationships() {}

function createForeingKeys() {}
