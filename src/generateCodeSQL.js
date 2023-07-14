import { getDataBaseName } from "./components/Header";

export default function createSQLCode(entitys) {
  let SQLCode = "";
  SQLCode += createDataBase();
  SQLCode += createTables(entitys);
  SQLCode += createForeignKeys(entitys);
  navigator.clipboard.writeText(SQLCode);
  alert(SQLCode);
  return SQLCode;
}

function createDataBase() {
  let dataBaseCode = `CREATE DATABASE ${getDataBaseName()};\n`;
  let dataBaseName = getDataBaseName() !== "" ? getDataBaseName() : "dataBaseName";
  dataBaseCode = dataBaseCode.concat(`USE ${dataBaseName};\n`);
  return dataBaseCode;
}

function createTables(entitys) {
  let tablesCode = "";
  for (let i = 0; i < entitys.length; i++) {
    const hasAttributes = entitys[i].attributes && entitys[i].attributes.length > 0;
    if (hasAttributes) {
      const attributesCode = createAttributes(entitys[i].attributes);
      const tableCode = `CREATE TABLE ${entitys[i].name} (\n${attributesCode}\n);\n`;
      tablesCode += tableCode;
    }
  }
  return tablesCode;
}

function createAttributes(attributes) {
  const attributesCode = attributes.map((attribute) => {
    const primaryKey = attribute.PK ? " PRIMARY KEY" : "";
    return `${attribute.name} ${attribute.type}${primaryKey}`;
  });

  return attributesCode.join(",\n");
}

function createForeignKeys(entitys) {
  let foreignKeysCode = "";
  for (let i = 0; i < entitys.length; i++) {
    const hasForeignKeys = entitys[i].foreignKeys && entitys[i].foreignKeys.length > 0;
    if (hasForeignKeys) {
      for (let j = 0; j < entitys[i].foreignKeys.length; j++) {
        const foreignKey = entitys[i].foreignKeys[j];
        const foreignKeyCode = `ALTER TABLE ${entitys[i].name} ADD CONSTRAINT fk_${entitys[i].name}_${foreignKey.field} FOREIGN KEY (${foreignKey.field}) REFERENCES ${foreignKey.referenceTable}(${foreignKey.referenceField});\n`;
        foreignKeysCode += foreignKeyCode;
      }
    }
  }
  return foreignKeysCode;
}