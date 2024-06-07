import React, { useState } from "react";
import { createCliente, listClientes } from "../../../model/cliente";

const CreateCliente = () => {
    const [inputNome, setInputNome] = useState('');
    const [storedValues, setStoredValues] = useState([]);
    const [contas, setContas] = useState({});

    const handleCreateCliente = async () => {
        await createCliente(inputNome);
        setInputNome('');
        listClientes(setStoredValues, setContas);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleCreateCliente();
        }
    };

    return (
        <div className="bg-amber-700">
            <h3>Criar Novo Cliente</h3>
            <input 
                type="text" 
                value={inputNome}
                onChange={(e) => setInputNome(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nome do Cliente"
            />
            <button onClick={handleCreateCliente}>Criar</button>
        </div>
    );
};

export default CreateCliente;
