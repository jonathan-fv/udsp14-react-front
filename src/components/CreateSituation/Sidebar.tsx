import React from 'react';

const Sidebar = (props: any) => {
  // @ts-ignore
  const onDragStart = (event, nodeType, situationType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/situationType', situationType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <button className='border border-blue-600 p-3' onClick={props.onRestore}>Restore</button>
      <button className='border border-blue-600 p-3' onClick={props.onSave}>Save</button>
      <div className="description">Vous pouvez glisser-déposer les éléments suivants sur le canvas pour créer une situation:</div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'question', 'question')} draggable>
        Question
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'answer', 'answer')} draggable>
        Réponse
      </div>
    </aside>
  );
};

export default Sidebar;