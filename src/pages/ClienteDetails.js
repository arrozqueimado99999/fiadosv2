import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClienteById } from '../model/cliente';
import Loading from '../layout/Loading';
import BtnAlpha from '../layout/components/buttons/BtnAlpha';
import { HiArrowNarrowLeft } from 'react-icons/hi';

const ClienteDetails = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCliente = async () => {
      const clienteData = await getClienteById(id);
      setCliente(clienteData);
    };

    fetchCliente();
  }, [id]);

  if (!cliente) {
    return <Loading/>;
  }

  return (
    <div className='p-8 flex h-full flex-col gap-4'>
        <nav className='flex bg-red-400 gap-2'>
            <BtnAlpha
            click={() => navigate('/clientes')}
            icon={<HiArrowNarrowLeft/>}
            />
            <h1 className='text-3xl font-extrabold'>{cliente.nome}</h1>
        </nav>
        <section className='grid grid-cols-2'>
            <div className='bg-purple-400 h-full'>
                sdcsd

            </div>
        </section>
    </div>
  );
};

export default ClienteDetails;
