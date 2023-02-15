import { IDemandeElu } from "@/models/DemandeElu";
import HttpApiService from "./HttpApiService";


const API_BASE = "http://localhost:3000"; // = `${process.env.REACT_APP_API_URI}`;
const REQUETEDEMANDESELUS_ENDPOINT = `${API_BASE}/demandeselus`;

export class DemandeEluApi extends HttpApiService {
    constructor() {
      super(`${API_BASE}`);
    }
  
    //#region Contact
    getDemandeEluById = (id: number) => {
      return this.get(`${REQUETEDEMANDESELUS_ENDPOINT}/${id}`);
    };
  
    getAllDemandesElus = (eluId:number) => {
      const response = this.get(`${REQUETEDEMANDESELUS_ENDPOINT}/?eluId=${eluId}`);
      return response
    };
  
    createDemandeElu = (data: IDemandeElu) => {
      return super.create(`${REQUETEDEMANDESELUS_ENDPOINT}`, data);
    };
  
    updateDemandeElu = (data: IDemandeElu) => {
      return super.update(`${REQUETEDEMANDESELUS_ENDPOINT}`, data);
    };
    //#endregion Contact
  
  }
  
  export const DemandeEluApiService = new DemandeEluApi();
  