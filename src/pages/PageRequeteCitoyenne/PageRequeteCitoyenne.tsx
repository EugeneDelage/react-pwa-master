import { RequeteCitoyenneApiService } from '@/api/RequeteCitoyenneService';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { IRequeteCitoyenne } from '@/models/RequetesCitoyennes';
import { Box, Card, CardContent, CardHeader, makeStyles, Tooltip } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

function PageRequeteCitoyenne() {
    const {id} = useParams();

    const fetchRequeteCitoyenne = async () =>{
        if (id){
          console.log("fetching Requete");
          const response = await RequeteCitoyenneApiService.getRequeteCitoyenneById(Number(id));
          const requeteCitoyenne=response.data;
          console.log("fetch response.data",requeteCitoyenne);
          reset(response.data);
          return requeteCitoyenne;
        }
        return null;
      }  
    const {isError, isLoading, data, error} = useQuery(
        'requetecitoyenne',
        fetchRequeteCitoyenne,
        {staleTime:60000}
      );   

    const { handleSubmit, control, reset, formState: { errors } } = useForm<IRequeteCitoyenne>({
      defaultValues:{...data},
    });

    if (isLoading){
        console.log("Loading...",data);
        return <div>Chargement...</div>
      }
      if (isError){
        console.log("Erreur...",error);
        return <div>Erreur...</div>
      }

     const onSubmit=(data:IRequeteCitoyenne)=> {
    console.log(data);
  }


    return(
        <>
        <FullSizeCenteredFlexBox>
           <Box sx={{ Width: '100%'}}>
             <Card  sx={{ Width: '100%'}}>
              <CardHeader  title={data.requerant}>
                 
              </CardHeader>
              <CardContent>
              {data.emplacement}
              </CardContent>
            </Card>
          </Box>

       </FullSizeCenteredFlexBox>
    </>
    );
}

export default PageRequeteCitoyenne;
