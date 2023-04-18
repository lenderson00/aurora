import React from 'react';
import { createRoot } from 'react-dom/client'
import './popup.css'

const Popup = () => {
  return (
    <div>
      <h1>Popup</h1>
    </div>
  );
};


const root = document.createElement('div');
root.id = 'popup-root';
document.body.appendChild(root);

createRoot(root).render(<Popup />);