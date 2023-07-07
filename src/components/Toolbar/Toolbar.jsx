import './Toolbar.css';

export default function Toolbar(props) {
  // Criar função para limpar os componentes da tela
  return (
    <div id="toolbar">
      <button id="addNode" onClick={props.addNode}><img id="image" src='src\images\AddNode.jpeg' /></button>
      <button id="generateSQLCode" onClick={props.generateSQLCode}><img id="image" src='src\images\SQLImage.jpeg' /></button>
      <button id="clearWindow" onClick={props.clearWindow}><img id="image" src='src\images\LimpezaCache.jpeg' /></button>
    </div>
  );
}
