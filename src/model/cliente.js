import { getFirestore, addDoc, collection, deleteDoc, doc, serverTimestamp, getDoc, query, where, orderBy, limit, getDocs, onSnapshot, getCountFromServer } from "firebase/firestore";
import { listContas } from "./conta";

const db = getFirestore();

const tailwindColors = [
  'bg-red-200',
  'bg-yellow-200',
  'bg-green-200',
  'bg-blue-200',
  'bg-indigo-200',
  'bg-purple-200',
  'bg-pink-200',
  // Adicione outras cores conforme necessário
];

const getRandomTailwindColor = () => {
  const randomIndex = Math.floor(Math.random() * tailwindColors.length);
  return tailwindColors[randomIndex];
};

export const createCliente = async (nome) => {
  try {
    const color = getRandomTailwindColor();
    await addDoc(collection(db, 'clientes'), {
      nome,
      color,
    });
    console.log("Cliente criado com sucesso!");
  } catch (e) {
    console.error("Erro ao adicionar cliente: ", e);
  }
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

export const listContasCount = async (clienteId, setContasCount) => {
  const contasRef = collection(db, "contas");
  const q = query(contasRef, where("clienteId", "==", clienteId));

  const snapshot = await getCountFromServer(q);
  setContasCount((prev) => ({
    ...prev,
    [clienteId]: snapshot.data().count,
  }));
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
