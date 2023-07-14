import { getDataBaseName } from "./components/Header";

export default function createSQLCode(entitys) {
  
  // console.log("Log das entitys recebidas pelo createSQLCode " + [entitys]);
  let SQLCode = "";
  // console.log(entitys);
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
  // console.log("Log das entitys recebidas pelo createTables " + entitys);
  let tablesCode = "";
  // entitys.map((entity) => {
  //   const hasAttributes = entity.attributes && entity.attributes.length > 0;
  //   const hasForeignKeys = entity.foreignKeys && entity.foreignKeys.length > 0;
  //   if (hasAttributes || hasForeignKeys) {
  //     console.log("entity " + entity + " attributes " + entity.attributes);
  //     const attributesCode = createAttributesCode(entity.attributes);
  //     const tableCode = `CREATE TABLE ${entity.name} (\n${attributesCode});\n`;
  //     tablesCode += tableCode;
  //   }
  // });
  
  // console.log(entitys.length);
  for(let i =0; i < entitys.length; i++) {
    const hasAttributes = entitys[i].attributes && entitys[i].attributes.length > 0;
    const hasForeignKeys = entitys[i].foreignKeys && entitys[i].foreignKeys.length > 0;
    console.log(entitys[i]);
    console.log(hasAttributes || hasForeignKeys);
    // if (hasAttributes || hasForeignKeys) {
      // console.log("entity " + entitys[i].name + " attributes ");
      // console.log(entitys[i].attributes);
      const attributesCode = createAttributesCode(entitys[i].attributes);
      const tableCode = `CREATE TABLE ${entitys[i].name} (\n${attributesCode});\n`;
      tablesCode += tableCode;
      console.log("================================");
      console.log(tablesCode);
      console.log("================================");
    // }
  }


  return tablesCode;
}

function createAttributesCode(attributes) {
  const attributesCode = attributes.map((attribute) => {
    const primaryKey = attribute.PK ? "PRIMARY KEY " : "";
    return `${attribute.name} ${attribute.type} ${primaryKey}`;
  });

  return attributesCode.join(",\n");
}

function createForeingKeys(entitys) {}
