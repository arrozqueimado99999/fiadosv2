import { getFirestore, addDoc, updateDoc, collection, deleteDoc, doc, query, where, getDocs, getDoc, orderBy, limit } from "firebase/firestore";
import { listClientes } from "./cliente";

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

export const deleteConta = async (id, a, b) => {
  const userDoc = doc(db, "contas", id);
  await deleteDoc(userDoc);
  listClientes(a, b);
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
      listContas(clienteId, setContas);
    } else {
      console.error("Documento não encontrado!");
    }
  } catch (error) {
    console.error("Erro ao alternar o status de pagamento da conta: ", error);
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
