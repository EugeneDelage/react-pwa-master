export interface IRequeteCitoyenne {
    id:number,
    lue: boolean, 
    noRequete:string;
    requerant:string;
    emplacement:string;
    adresse:string;
    typerequete:string;
    sommaire:string; 
    statut:string;
    dateconsentement: Date;
    nodemandeelu: string;
    datesuiviDG:Date;
    sujet:string;
    telephone1:string;
    telephone2:string;
    langue:string;
    district:string;
    statutdemande:string;
}
