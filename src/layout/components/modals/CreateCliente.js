import React, { useState } from "react";
import { createCliente, listClientes } from "../../../model/cliente";
import InputText from "../inputs/InputText";
import BtnSolid from "../buttons/BtnSolid";
import { useModal } from '../../../ModalContext';

const CreateCliente = () => {
    const [inputNome, setInputNome] = useState('');
    const [storedValues, setStoredValues] = useState([]);
    const [contas, setContas] = useState({});
    const { isOpen, modalContent, openModal, closeModal } = useModal();

    const handleCreateCliente = async () => {
        closeModal();
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
        <div className="min-h-full w-full flex flex-col justify-center gap-3">
            <p className="text-xl font-black">Criar cliente</p>
            <div className="h-full">
                <InputText 
                    type="text" 
                    value={inputNome}
                    onChange={(e) => setInputNome(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nome"
                />
            </div>
            <nav className="h-fit flex justify-end">
                <BtnSolid 
                click={handleCreateCliente}
                text={"Criar"}
                />
            </nav>
        </div>
    );
};

export default CreateCliente;
