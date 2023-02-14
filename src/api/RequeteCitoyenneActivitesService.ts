import { IRequeteCitoyenneActivite } from "@/models/RequeteCitoyenneActivite";
import HttpApiService from "./HttpApiService";


const API_BASE = "http://localhost:3000"; // = `${process.env.REACT_APP_API_URI}`;
const REQUETECITOYENNEACTIVITES_ENDPOINT = `${API_BASE}/requetecitoyenneactivites`;

export class RequeteCitoyenneActivitesApi extends HttpApiService {
    constructor() {
      super(`${API_BASE}`);
    }
  
    //#region Contact
    getRequeteCitoyenneActiviteById = (id: number) => {
      return this.get(`${REQUETECITOYENNEACTIVITES_ENDPOINT}/${id}`);
    };
  
    getAllRequeteCitoyenneActivites = (requeteId: number) => {
      const response = this.get(`${REQUETECITOYENNEACTIVITES_ENDPOINT}/${requeteId}`);
      return response
    };
  
    createRequeteCitoyenneActivite = (data: IRequeteCitoyenneActivite) => {
      return super.create(`${REQUETECITOYENNEACTIVITES_ENDPOINT}`, data);
    };
  
    updateRequeteCitoyenneActivite = (data: IRequeteCitoyenneActivite) => {
      return super.update(`${REQUETECITOYENNEACTIVITES_ENDPOINT}`, data);
    };
    //#endregion Contact
  
  }
  
  export const RequeteCitoyenneActivitesApiService = new RequeteCitoyenneActivitesApi();
  