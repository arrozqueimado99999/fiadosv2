import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getContaById, marcarComoPago } from "../../../model/conta";
import Loading from "../../Loading";
import BtnOutline from "../buttons/BtnOutline";
import { HiCash, HiCurrencyDollar } from "react-icons/hi";
import {toast} from "react-toastify";
import BtnSolid from "../buttons/BtnSolid";
import SimpleLoad from "../../SimpleLoad";

const ContaOverview = ({ contaId, setContas }) => {
  const { id: clienteId } = useParams();
  const [conta, setConta] = useState(null);

  useEffect(() => {
    const fetchContaData = async () => {
      try {
        const contaData = await getContaById(contaId);
        setConta(contaData);
      } catch (error) {
        console.error("Erro ao buscar dados da conta: ", error);
      }
    };

    fetchContaData();
  }, [contaId]);

  const handleMarcarComoPago = async () => {
    try {
      await marcarComoPago(conta.id, clienteId, setContas);
      const updatedConta = await getContaById(conta.id);
      setConta(updatedConta);
    } catch (error) {
    toast.error("Erro ao marcar como pago");
    }
  };

  return (
    <div className='w-full p-3 flex flex-col relative items-center justify-center gap-3'>
      {conta ? (
        <>
          <div className="flex justify-between items-center w-full">
            <p className="text-xl">{conta.descricao}</p>
            <div className={`${conta.pago ? 'bg-green-200' : 'bg-red-200'} px-3 py-2 flex rounded-2xl justify-center items-center gap-1`}>
                <BtnSolid
                  icon={<HiCurrencyDollar />}
                  tooltip={'Marcar como pago'}
                  click={handleMarcarComoPago}
                />
                <span className="text-md font-bold p-1">{conta.valor}</span>
            </div>
          </div>
          <p className="text-xl p-2">Pago: {conta.pago ? "Sim" : "Não"}</p>
        </>
      ) : (
        <SimpleLoad />
      )}
    </div>
  );
};

export default ContaOverview;
