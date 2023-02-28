import HttpApiService from "./HttpApiService";

const API_BASE = "http://localhost:3000"; // = `${process.env.REACT_APP_API_URI}`;
const REQUERANT_ENDPOINT = `${API_BASE}/requerants`;

export class RequerantsApi extends HttpApiService {
    constructor() {
      super(`${API_BASE}`);
    }
  
    
    getRequerantById = (id: number) => {
      return this.get(`${REQUERANT_ENDPOINT }/${id}`);
    };
  
    getAllRequerants = () => {
      const response = this.get(`${REQUERANT_ENDPOINT}`);
      return response
    };
 
  }
  
  export const RequerantsApiService = new RequerantsApi();
  