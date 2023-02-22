export interface IDemandeElu {
    id:number,
    noDemande:string;
    typeDemande:string;
    requeteId:number;
    eluId:number;
    sujet: string;
    statut: string;
    adresse: string;
    description:string;
    suiviPlanifieDgDate?:Date
}