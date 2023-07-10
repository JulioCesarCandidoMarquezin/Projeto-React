import { getDataBaseName } from "./components/Header/Header";

export default function createSQLCode(entitys) {
  console.log(entitys[0]);
  let SQLCode = "";
  SQLCode = SQLCode.concat(createDataBase());
  SQLCode = SQLCode.concat(`${createTables(entitys)}`);
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

function createTables(entitys, attributes, foreingKeys) {
  let tablesCode = "";
  entitys.forEach((entity) => {
    console.log("attributes: ", attributes);
    console.log("foreingKeys: ", foreingKeys);  
    tablesCode = tablesCode.concat(
      `CREATE TABLE ${entity.data.name} (${createAttributes(entity)});\n`
    );
  });
  return tablesCode;
}

function createAttributes(entity) {
  const attributesCode = entity.data.attribute
  console.log(attributesCode.nameId);
  
  return attributesCode;
}

function createAssociationTable() {}

function relationships() {}

function createForeingKeys() {}
