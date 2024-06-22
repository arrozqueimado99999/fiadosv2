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
        <div className="min-h-full w-full flex flex-col items-center justify-center gap-3">
            <p className="text-3xl py-8 font-black">Criar cliente</p>
            <div className="h-full w-10/12">
                <InputText 
                    type="text" 
                    value={inputNome}
                    onChange={(e) => setInputNome(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nome"
                />
            </div>
            <nav className="h-fit w-10/12 flex justify-end">
                <BtnSolid 
                click={handleCreateCliente}
                text={"Criar"}
                />
            </nav>
        </div>
    );
};

export default CreateCliente;
