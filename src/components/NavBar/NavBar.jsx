import './NavBar.css';

export default function NavBar() {
  return (
    <div id="NavBar">
      <input id="inputName" defaultValue="Dotum" />
    </div>
  );
}

export let nameDB = document.getElementById('inputName').value;
