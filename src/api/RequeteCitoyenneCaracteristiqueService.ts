import { IRequeteCitoyenneCaracteristique } from "@/models/RequeteCitoyenneCaracteristique";
import HttpApiService from "./HttpApiService";


const API_BASE = "http://localhost:3000"; // = `${process.env.REACT_APP_API_URI}`;
const REQUETECITOYENNECARACTS_ENDPOINT = `${API_BASE}/requetecitoyennecaracteristiques`;

export class RequeteCitoyenneCaracteristiquesApi extends HttpApiService {
    constructor() {
      super(`${API_BASE}`);
    }
  

    getRequeteCitoyenneCaracteristiqueById = (id: number) => {
      return this.get(`${REQUETECITOYENNECARACTS_ENDPOINT}/${id}`);
    };
  
    getAllRequeteCitoyenneCaracteristiques = (requeteId: number) => {
      const response = this.get(`${REQUETECITOYENNECARACTS_ENDPOINT}/?requeteId=${requeteId}`);
      return response
    };
  
  }
  
  export const RequeteCitoyenneCaracteristiquesApiService = new RequeteCitoyenneCaracteristiquesApi();
  