import { getFirestore, addDoc, collection, deleteDoc, doc, serverTimestamp, getDoc, query, where, orderBy, limit, getDocs, onSnapshot } from "firebase/firestore";
import { listContas } from "./conta";

const db = getFirestore();

export const createCliente = async (nome) => {
  await addDoc(collection(db, "clientes"), {
    nome,
    dataCriacao: serverTimestamp()
  });
};

export const deleteCliente = async (id) => {
  const userDoc = doc(db, "clientes", id);
  await deleteDoc(userDoc);
};

export const listClientes = (setStoredValues, setContas) => {
  onSnapshot(collection(db, "clientes"), (snapshot) => {
    const temporaryArr = [];
    snapshot.forEach((doc) => {
      temporaryArr.push({ id: doc.id, ...doc.data() });
    });
    setStoredValues(temporaryArr);
    temporaryArr.forEach(cliente => listContas(cliente.id, setContas));
  });
};


export const getClienteById = async (id) => {
  const clienteDoc = doc(db, "clientes", id);
  const clienteSnapshot = await getDoc(clienteDoc);
  if (clienteSnapshot.exists()) {
    return { id: clienteSnapshot.id, ...clienteSnapshot.data() };
  } else {
    throw new Error(`Cliente with ID ${id} does not exist`);
  }
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

export const listClientesComUltimasContas = async (clienteId, setStoredValues, setUltimasContas) => {
  if (typeof clienteId !== 'string') {
    throw new Error("clienteId deve ser uma string");
  }

  const clienteSnapshot = await getDoc(doc(db, "clientes", clienteId));
  
  if (!clienteSnapshot.exists()) {
    throw new Error(`Cliente with ID ${clienteId} does not exist`);
  }

  const temporaryArr = [{ id: clienteSnapshot.id, ...clienteSnapshot.data() }];
  setStoredValues(temporaryArr);
  
  const contasPromises = temporaryArr.map(async (cliente) => {
    const ultimasContas = await buscarUltimasContas(cliente.id);
    return { clienteId: cliente.id, contas: ultimasContas };
  });
  
  const contasResult = await Promise.all(contasPromises);
  const contasObj = contasResult.reduce((acc, { clienteId, contas }) => {
    acc[clienteId] = contas;
    return acc;
  }, {});
  
  setUltimasContas(contasObj);
};
