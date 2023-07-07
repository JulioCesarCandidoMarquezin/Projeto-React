import './NavBar.css';

export default function NavBar({value}) {
  return (
    <div id="NavBar">
      <input id="inputName" defaultValue={value} placeholder='Title'/>
    </div>
  );
}
