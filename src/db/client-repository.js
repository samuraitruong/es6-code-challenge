export class ClientRepository {
  constructor(config) {
    this.clients = config.clients || [];
  }
  getClientById(id) {
    const matchClient = this.clients.find((client) => client.clientId === id);
    return matchClient;
  }
}
export default ClientRepository;
