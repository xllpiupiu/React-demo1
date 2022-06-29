//在package.json中查看安装的react版本
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />)