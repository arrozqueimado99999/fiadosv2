import { getFirestore, addDoc, setDoc, collection, deleteDoc, doc, query, where, getDocs, writeBatch, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const db = getFirestore();

/**
 * Move todas as contas de um cliente específico para um novo pedido.
 * @param {string} clienteId - O ID do cliente cujas contas serão movidas.
 * @returns {Promise<void>}
 */
export const moveContasToPedido = async (clienteId) => {
  try {
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

    // Criar um novo pedido com referência ao cliente e data de criação
    const pedidoRef = doc(pedidosRef); // Cria um novo documento com um ID gerado automaticamente
    const pedidoId = pedidoRef.id;
    await setDoc(pedidoRef, {
      clienteId,
      dataCriacao: new Date(),
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

    toast.success(`Todas as contas foram movidas para o pedido ${pedidoId}`);
  } catch (error) {
    toast.error(`Erro ao mover contas para pedido: ${error.message}`);
  }
};

/**
 * Cria um novo pedido com uma lista de contas.
 * @param {string} clienteId - O ID do cliente para o qual o pedido será criado.
 * @param {Array} contas - Lista de contas para adicionar ao pedido.
 * @returns {Promise<void>}
 */
export const createPedido = async (clienteId, contas) => {
  try {
    const pedidosRef = collection(db, "pedidos");
    const pedidoRef = doc(pedidosRef);
    const pedidoId = pedidoRef.id;
    await setDoc(pedidoRef, {
      clienteId,
      dataCriacao: new Date(),
    });

    const batch = writeBatch(db);

    contas.forEach((conta) => {
      const contaPedidoRef = doc(pedidoRef, "contas", conta.id);
      batch.set(contaPedidoRef, {
        ...conta,
        pedidoId,
      });
    });

    await batch.commit();
    toast.success(`Pedido ${pedidoId} criado com sucesso.`);
  } catch (error) {
    toast.error(`Erro ao criar pedido: ${error.message}`);
  }
};

/**
 * Remove um pedido e todas as suas contas associadas.
 * @param {string} pedidoId - O ID do pedido a ser removido.
 * @returns {Promise<void>}
 */
export const deletePedido = async (pedidoId) => {
  try {
    const pedidosRef = collection(db, "pedidos");
    const pedidoRef = doc(pedidosRef, pedidoId);
    const contasSnapshot = await getDocs(query(collection(pedidoRef, "contas")));

    const batch = writeBatch(db);
    contasSnapshot.forEach((docSnap) => {
      const contaRef = doc(pedidoRef, "contas", docSnap.id);
      batch.delete(contaRef);
    });

    batch.delete(pedidoRef);
    await batch.commit();

    toast.success(`Pedido ${pedidoId} removido com sucesso.`);
  } catch (error) {
    toast.error(`Erro ao remover pedido: ${error.message}`);
  }
};

/**
 * Lista todos os pedidos de um cliente específico.
 * @param {string} clienteId - O ID do cliente para listar os pedidos.
 * @returns {Promise<Array>} - Lista de pedidos.
 */
export const listarPedidos = async (clienteId) => {
  try {
    const pedidosRef = collection(db, "pedidos");
    const q = query(pedidosRef, where("clienteId", "==", clienteId));
    const pedidosSnapshot = await getDocs(q);
    const pedidosArray = [];
    pedidosSnapshot.forEach((docSnap) => {
      pedidosArray.push({ id: docSnap.id, ...docSnap.data() });
    });
    return pedidosArray;
  } catch (error) {
    toast.error(`Erro ao listar pedidos: ${error.message}`);
    return [];
  }
};

/**
 * Lista todas as contas dentro de um pedido específico.
 * @param {string} pedidoId - O ID do pedido.
 * @returns {Promise<Array>} - Lista de contas.
 */
export const listarContasByPedido = async (pedidoId) => {
  try {
    const contasRef = collection(db, "pedidos", pedidoId, "contas");
    const contasSnapshot = await getDocs(contasRef);
    const contasList = contasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return contasList;
  } catch (error) {
    console.error("Erro ao buscar contas:", error);
    throw new Error("Erro ao buscar contas");
  }
};

/**
 * Busca uma conta específica dentro de um pedido.
 * @param {string} pedidoId - O ID do pedido.
 * @param {string} contaId - O ID da conta.
 * @returns {Promise<Object>} - Dados da conta.
 */
export const getContaByPedido = async (pedidoId, contaId) => {
  const contaRef = doc(db, "pedidos", pedidoId, "contas", contaId);
  const contaSnap = await getDoc(contaRef);
  if (contaSnap.exists()) {
    return contaSnap.data();
  } else {
    throw new Error("Conta não encontrada no pedido");
  }
};