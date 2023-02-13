export interface IRequeteCitoyenne {
    id:number,
    lue: boolean, 
    noRequete:string;
    requerant:string;
    emplacement:string;
    typerequete:string;
    sommaire:string; 
    statut:string;
    dateconsentement: Date;
    nodemandeelu: string;
    datesuiviDG:Date;
    sujet:string;
    statutdemande:string;
}
