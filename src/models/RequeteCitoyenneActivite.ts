export interface IRequeteCitoyenneActivite {
    id:number,
    requeteId: number, 
    createdDate:Date;
    typeActivite:string;
    sujet:string;
    fichiers:string;
    description:string;
    commentairesPortail:boolean;
}
     