import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import RootLayout from './layout/RootLayout';
import ModalContainer from './ModalContainer';
import { ModalProvider } from './ModalContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clientes from './pages/Clientes';
import { ToastContainer } from 'react-toastify';
import 'react-tooltip/dist/react-tooltip.css'

const router = (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<p>home</p>} />
        <Route path='clientes' element={<Clientes />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ModalProvider>
    <React.StrictMode>
      {router}
      <ToastContainer/>
    </React.StrictMode>
  </ModalProvider>
);
