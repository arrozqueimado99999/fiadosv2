import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RootLayout from './layout/RootLayout';
import { ModalProvider } from './ModalContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clientes from './pages/Clientes';
import ClienteDetails from './pages/ClienteDetails'; // Importe o componente de detalhes do cliente
import Login from './Login';
import { ToastContainer } from 'react-toastify';
import 'react-tooltip/dist/react-tooltip.css'
import Register from './Register';

const router = (
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<p>home</p>} />
        <Route path='clientes' element={<Clientes />} />
        <Route path='clientes/:id' element={<ClienteDetails />} /> {/* Adiciona a rota de detalhes do cliente */}
        <Route path='register' element={<Register />} />
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
