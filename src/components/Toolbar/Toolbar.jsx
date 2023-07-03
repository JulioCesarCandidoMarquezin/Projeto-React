import './Toolbar.css';

export default function Toolbar(props) {
  return (
    <div id="toolbar">
      <button id="newNode" onClick={props.onClick}></button>
    </div>
  );
}
