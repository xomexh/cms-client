import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './src/App';

import Login from './src/Login'

ReactDOM.render(<BrowserRouter>
                    <App/>
                </BrowserRouter>,document.getElementById('root'))