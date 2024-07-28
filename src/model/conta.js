import { getFirestore, addDoc, updateDoc, collection, deleteDoc, doc, query, where, getDocs, getDoc, orderBy, limit, writeBatch, setDoc } from "firebase/firestore";
import { listClientes } from "./cliente";
import { toast } from "react-toastify";

const db = getFirestore();

export const createConta = async (descricao, valor, pago, clienteId, dataCriacao) => {
  const dataCriacaoTimestamp = dataCriacao ? new Date(dataCriacao) : new Date();

  await addDoc(collection(db, "contas"), {
    descricao,
    valor: parseFloat(valor),
    pago,
    clienteId,
    dataCriacao: dataCriacaoTimestamp
  });
};

export const getContaById = async (contaId) => {
  const contaRef = doc(db, "contas", contaId);
  const contaSnap = await getDoc(contaRef);
  if (contaSnap.exists()) {
    return contaSnap.data();
  } else {
    throw new Error("Conta não encontrada");
  }
};

export const deleteConta = async (id, a, b) => {
  const userDoc = doc(db, "contas", id);
  await deleteDoc(userDoc);
};

export const listContas = async (clienteId, setContas) => {
  const q = query(collection(db, "contas"), where("clienteId", "==", clienteId));
  const querySnapshot = await getDocs(q);
  const contasArray = [];
  querySnapshot.forEach((doc) => {
    contasArray.push({ id: doc.id, ...doc.data() });
  });
  setContas(prevContas => ({ ...prevContas, [clienteId]: contasArray }));
};

export const marcarComoPago = async (contaId, clienteId, setContas) => {
  const contaRef = doc(db, "contas", contaId);
  try {
    const contaSnap = await getDoc(contaRef);
    if (contaSnap.exists()) {
      const currentPago = contaSnap.data().pago;
      await updateDoc(contaRef, {
        pago: !currentPago
      });
      toast.success("Conta marcada como paga");

    } else {
      console.error("Documento não encontrado!");
    }
  } catch (error) {
    toast.error("Erro ao marcar como pago");
  }
};

export const buscarContasPorCliente = async (clienteId) => {
  const q = query(collection(db, "contas"), where("clienteId", "==", clienteId));
  const querySnapshot = await getDocs(q);
  const contasArray = [];
  querySnapshot.forEach((doc) => {
    contasArray.push({ id: doc.id, ...doc.data() });
  });
  return { [clienteId]: contasArray };
};

export const buscarUltimasContas = async (clienteId) => {
  const q = query(
    collection(db, "contas"),
    where("clienteId", "==", clienteId),
    orderBy("dataCriacao", "desc"),
    limit(3)
  );
  const querySnapshot = await getDocs(q);
  const contasArray = [];
  querySnapshot.forEach((doc) => {
    contasArray.push({ id: doc.id, ...doc.data() });
  });
  return contasArray;
};

/**
 * Move todas as contas de um cliente específico para um novo pedido.
 * @param {string} clienteId - O ID do cliente cujas contas serão movidas.
 * @returns {Promise<void>}
 */


export const moveContasToPedido = async (clienteId) => {
  try {
    // Referência para a coleção de clientes
    const clienteRef = doc(db, "clientes", clienteId);
    const clienteDoc = await getDoc(clienteRef);

    if (!clienteDoc.exists()) {
      toast.error('Cliente não encontrado.');
      return;
    }

    // Obter o nome do cliente
    const clienteData = clienteDoc.data();
    const nomeCliente = clienteData.nome;

    // Referências para as coleções de contas e pedidos
    const contasRef = collection(db, "contas");
    const pedidosRef = collection(db, "pedidos");

    // Buscar todas as contas do cliente
    const q = query(contasRef, where("clienteId", "==", clienteId));
    const contasSnapshot = await getDocs(q);

    if (contasSnapshot.empty) {
      toast.warn('Nenhuma conta encontrada para o cliente.');
      return;
    }

    // Buscar todos os pedidos do cliente para contar quantos já existem
    const pedidosQuery = query(pedidosRef, where("clienteId", "==", clienteId));
    const pedidosSnapshot = await getDocs(pedidosQuery);
    const numeroPedido = pedidosSnapshot.size + 1; // Número do novo pedido

    // Criar o título do pedido
    const tituloPedido = `Pedido ${numeroPedido} de ${nomeCliente}`;

    // Criar um novo pedido com referência ao cliente e data de criação
    const pedidoRef = doc(pedidosRef); // Cria um novo documento com um ID gerado automaticamente
    const pedidoId = pedidoRef.id;
    await setDoc(pedidoRef, {
      clienteId,
      dataCriacao: new Date(),
      titulo: tituloPedido,
    });

    // Usar um batch para operações atômicas
    const batch = writeBatch(db);

    contasSnapshot.forEach((docSnap) => {
      const contaData = docSnap.data();
      
      // Adicionar a conta ao novo pedido
      const contaPedidoRef = doc(pedidoRef, "contas", docSnap.id);
      batch.set(contaPedidoRef, {
        ...contaData,
        pedidoId, // Adiciona a referência ao pedido
      });

      // Remover a conta da coleção original
      const contaRef = doc(contasRef, docSnap.id);
      batch.delete(contaRef);
    });

    // Commit the batch
    await batch.commit();

    toast.success(`Todas as contas foram movidas para o  "${tituloPedido}"`);
  } catch (error) {
    toast.error(`Erro ao mover contas para pedido: ${error.message}`);
  }
};