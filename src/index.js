import React from 'react';
import ReactDOM from 'react-dom/client';

import { Calculator } from './componets/Calculator/Calculator';

import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Calculator />
    </React.StrictMode>
);
