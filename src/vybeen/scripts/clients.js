import { updateClientsList } from "./uiManager";

const clients = [];

function getClients() {
    return clients;
}

function addClient(client) {
    clients.push(client);
    updateClientsList();
}

function removeClient(id) {
    clients.splice(clients.findIndex(c => c.id == id), 1);
    updateClientsList();
}

function getClientById(id) {
    return clients.find(client => client.id == id);
}

function setClients(clients) {
    clients.splice(0, clients.length);
    clients.forEach(client => {
        addClient(client);
    });
    updateClientsList();
}

export { addClient, getClientById, getClients, removeClient, setClients };