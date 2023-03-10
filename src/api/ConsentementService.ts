import HttpApiService from "./HttpApiService";
import {Consentement}  from '@/models/Consentement';


const API_BASE = "http://localhost:3000"; // = `${process.env.REACT_APP_API_URI}`;
const CONSENTEMENT_ENDPOINT = `${API_BASE}/consentements`;

export class ConsentementApi extends HttpApiService {
    constructor() {
      super(`${API_BASE}`);
    }
  
    //#region Contact
    getConsentementById = (id: number) => {
      return this.get(`${CONSENTEMENT_ENDPOINT}/${id}`);
    };
  
    getAllConsentements = () => {
      const response = this.get<Array<Consentement>>(`${CONSENTEMENT_ENDPOINT}`);
      return response
    };
  
    createConsentement = (data: Consentement) => {
      return super.create(`${CONSENTEMENT_ENDPOINT}`, data);
    };
  
    updateConsentement = (data: Consentement) => {
      return super.update(`${CONSENTEMENT_ENDPOINT}`, data);
    };
    //#endregion Contact
  
  }
  
  export const ConsentementApiService = new ConsentementApi();
  