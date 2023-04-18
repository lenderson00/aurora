import React from 'react';
import { createRoot } from 'react-dom/client'

const Options = () => {
  return (
    <div>
      <h1>Options</h1>
      <img src="icon.png" alt="icon" />
    </div>
  );
};


const root = document.createElement('div');
root.id = 'Options-root';
document.body.appendChild(root);

createRoot(root).render(<Options />);