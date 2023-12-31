/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import './../styles/Header.css';

export function getDataBaseName() {
  return document.getElementById("dataBaseName").value
}

export function setDataBaseName(newName) {
  document.getElementById("dataBaseName").value = newName
  return 
}

export default function Header({value, placeholder}) {
  return (
    <div id="NavBar">
      <input id="dataBaseName" defaultValue={value} placeholder={placeholder}/>
    </div>
  );
}
