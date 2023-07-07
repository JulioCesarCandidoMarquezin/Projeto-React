import './NavBar.css';

export function getDataBaseName() {
  return document.getElementById("dataBaseName").value
}

export function setDataBaseName(newName) {
  document.getElementById("dataBaseName").value = newName
  return 
}

export default function NavBar({value, placeholder}) {
  return (
    <div id="NavBar">
      <input id="dataBaseName" defaultValue={value} placeholder={placeholder}/>
    </div>
  );
}
