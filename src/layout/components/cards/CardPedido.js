import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { listarContasByPedido } from './../../../model/pedido'; // Ajuste o caminho conforme necessário
import { HiArrowCircleDown, HiArrowCircleUp, HiChevronDown, HiChevronUp, HiOutlineTrash } from 'react-icons/hi';
import Loading from '../../Loading';
import LoadDots from '../../LoadDots';
import BtnSolid from '../buttons/BtnSolid';

const CardPedido = ({ pedido, setPedidos }) => {
  const { id: clienteId } = useParams();
  const [showDropdown, setShowDropdown] = useState(false);
  const [contas, setContas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContas = async () => {
      setLoading(true);
      try {
        const contasList = await listarContasByPedido(pedido.id);
        setContas(contasList);
      } catch (error) {
        console.error("Erro ao buscar contas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (showDropdown) {
      fetchContas();
    }
  }, [showDropdown, pedido.id]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="flex flex-col bg-neutral-100 border-transparent border-2 hover:border-neutral-200 focus:bg-neutral-700 rounded-2xl cursor-pointer pedido-div relative justify-between items-center p-1 group">
      <div className='flex gap-2 flex-col p-2 items-start justify-center w-full'>
        <div className='flex flex-col gap-2 justify-between items-center w-full' onClick={() => setShowDropdown(!showDropdown)}>
          <nav className='flex justify-between w-full'>
            <div>
              <p className="text-sm font-semibold">{pedido.titulo}</p>
              <p className="text-xs font-thin">Criado em {formatDate(pedido.dataCriacao)}</p>
            </div>
            <span className="text-xl p-2 focus:outline-none">
              {showDropdown ? <HiChevronDown />: <HiChevronUp/>}
            </span>
          </nav>
        </div>
        {showDropdown && (
          <div className='w-full flex flex-col gap-2'>
            <nav className='h-7 flex justify-start gap-2 '>
              <BtnSolid
              icon={<HiOutlineTrash/>}
              text={'Excluir'}
              />
            </nav>

            <div className="flex flex-col gap-2 justify-center items-center rounded-lg w-full">
              {loading ? (
                <LoadDots />
              ) : contas.length === 0 ? (
                <p className="text-xs">Nenhuma conta encontrada.</p>
              ) : (
                contas.map((conta) => (
                  <div key={conta.id} className='bg-white rounded-2xl p-2 w-full'>
                    <p className="text-sm">{conta.descricao}</p>
                    <p className="text-xs">{formatCurrency(conta.valor)}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPedido;
