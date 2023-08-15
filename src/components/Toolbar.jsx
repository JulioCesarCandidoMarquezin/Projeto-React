/* eslint-disable react/prop-types */
import './../styles/Toolbar.css';

export default function Toolbar( { buttons } ) {
  return (
    <div id="toolbar">
      {buttons.map((button) => {
        return (
          <button key={button.id} id={button.id} onClick={button.onClick}>{button.content}</button>
        )
      })}
    </div>
  );
}
