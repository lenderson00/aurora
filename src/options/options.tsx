import React from 'react';
import { createRoot } from 'react-dom/client'
import '../assets/tailwind.css'


const Options = () => {
  return (
    <div>
      <h1 className='text-xl text-red-500 font-bold'>Options</h1>
      <img src="icon.png" alt="icon" />
    </div>
  );
};


const root = document.createElement('div');
root.id = 'Options-root';
document.body.appendChild(root);

createRoot(root).render(<Options />);