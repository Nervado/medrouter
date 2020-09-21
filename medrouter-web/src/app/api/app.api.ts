import { SocketIoConfig } from "ngx-socket-io";

export const MEDROUTER_API = "http://localhost:3001";

export const MEDICINES_API = "https://scalr.api.appbase.io/medicines/_search";

export const MEDICINES_API_USER = "Twc6pq3RN";

export const MEDICINES_API_PASS = "32f137a9-5b97-42f2-ad25-7a09e818d644";

export const CEP_API = "https://viacep.com.br";

export const KEY = "7b8455455df70f47c49d377e9957cef1";

export const SOCKET_IO_CONFIG: SocketIoConfig = {
  url: "http://localhost:3001",
  options: { query: "?wsJwtToken=98274972948" },
};
