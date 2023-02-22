import { IEquipeElu } from "@/models/EquipeElu";
import HttpApiService from "./HttpApiService";


const API_BASE = "http://localhost:3000"; // = `${process.env.REACT_APP_API_URI}`;
const EQUIPESELU_ENDPOINT = `${API_BASE}/equipeselu`;

export class EquipesEluApi extends HttpApiService {
    constructor() {
      super(`${API_BASE}`);
    }
  
    
    getEquipeEluById = (id: number) => {
      return this.get(`${EQUIPESELU_ENDPOINT}/${id}`);
    };
  
    getAllEquipesElu = () => {
      const response = this.get(`${EQUIPESELU_ENDPOINT}`);
      return response
    };
 
  }
  
  export const EquipesEluApiService = new EquipesEluApi();
  