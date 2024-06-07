import { getFirestore, addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, getDoc } from "firebase/firestore";
import { listContas } from './conta';

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
