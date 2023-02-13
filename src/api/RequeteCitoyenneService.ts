import { IRequeteCitoyenne } from "@/models/RequetesCitoyennes";
import HttpApiService from "./HttpApiService";


const API_BASE = "http://localhost:3000"; // = `${process.env.REACT_APP_API_URI}`;
const REQUETECITOYENNE_ENDPOINT = `${API_BASE}/requetescitoyennes`;

export class RequeteCitoyenneApi extends HttpApiService {
    constructor() {
      super(`${API_BASE}`);
    }
  
    //#region Contact
    getRequeteCitoyenneById = (id: number) => {
      return this.get(`${REQUETECITOYENNE_ENDPOINT}/${id}`);
    };
  
    getAllRequetesCitoyennes = () => {
      const response = this.get(`${REQUETECITOYENNE_ENDPOINT}`);
      return response
    };
  
    createRequeteCitoyenne = (data: IRequeteCitoyenne) => {
      return super.create(`${REQUETECITOYENNE_ENDPOINT}`, data);
    };
  
    updateRequeteCitoyenne = (data: IRequeteCitoyenne) => {
      return super.update(`${REQUETECITOYENNE_ENDPOINT}`, data);
    };
    //#endregion Contact
  
  }
  
  export const RequeteCitoyenneApiService = new RequeteCitoyenneApi();
  