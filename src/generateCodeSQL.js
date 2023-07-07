import { getDataBaseName } from "./components/NavBar/NavBar";
import { Relationships } from "./App";
import { Entitys } from "./components/Entity/Entity";
import { RelationshipsValues } from "./components/CustomEdge/CustomEdge";

export default function createSQLCode() {
  let SQLCode = "";
  SQLCode = SQLCode.concat(createDataBase());
  return SQLCode;
}

function createDataBase() {
  let dataBaseCode = `CREATE DATABASE ${getDataBaseName()}; \n`;
  dataBaseCode = dataBaseCode.concat(`USE ${getDataBaseName()}; \n`);
  dataBaseCode = dataBaseCode.concat(`${createTables()}; \n`)
  return dataBaseCode;
}

function createTables() {
  let tablesCode = ''
  Entitys.forEach((entity) => {
    tablesCode = tablesCode.concat(`CREATE TABLE ${entity.name} ( ${createAttributes(entity)} ); \n`);
  });
  return tablesCode;
}

function createAttributes(entity) {
    let attributesCode = ''
    `${entity.attributes.forEach((attribute) => {
        /* 
          Talvez dê erro por causa da virgula colocada depois do atributo,
          pode ser que o SQL não aceite essa virgula no final.
          */
          attributesCode = attributesCode.concat(` ${attribute.name} ${attribute.type}
          ${attribute.PK ? " PRIMARY KEY" : ""}, `);
      })}`
}

function createAssociationTable() {

}

function relationships() {

}

function createForeingKeys() {}
