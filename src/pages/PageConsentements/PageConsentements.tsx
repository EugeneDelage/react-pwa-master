import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
// import moment from 'moment';
import { useState,useEffect } from 'react';
import { ConsentementApiService } from '@/api/ConsentementService';
import Box from '@mui/material/Box';
import { DataGrid , GridColumns, GridRowId,GridActionsCellItem } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { IConsentement } from '@/models/Consentement';

function PageConsentements() {
  const [consentements, setConsentements] = useState([] as IConsentement);

  useEffect(() => {
    getConsentements();
  }, [])

  const getConsentements = async () =>{
      const response = await ConsentementApiService.getAllConsentements();
      console.log(response);
      setConsentements(response.data);
  }

  type Row = typeof consentements[number];
  
  const navigate = useNavigate(); 
 
  const [rows, setRows] = React.useState<Row[]>(consentements);

  const openConsentement = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        navigate(`/consentement/${id}`);
      });
    },
    [],
  );

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: 'id'         , type: 'number' , headerName: 'Id'             ,width: 60 },
      { field: 'requerant'  , type: 'string' , headerName: 'Requérant'      ,width: 160},
      { field: 'equipeelu'  , type: 'string' , headerName: 'Équipe Élu'     ,width: 160},
      { field: 'demandeDate', type: 'date'   , headerName: 'Date demande'   ,width: 200},
      { field: 'relanceDate', type: 'date'   , headerName: 'Date de relance',width: 200},
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
          icon={<OpenInNewIcon />}
          label="Ouvrir"
          onClick={openConsentement(params.id)}
          />,
        ],
      },
    ],
    [openConsentement],
  );
  

  return (
    <>
      <Meta title="Consentements" />
    
      <FullSizeCenteredFlexBox>
        <Box sx={{height:400, width:'100%'}}>
        <Typography  variant="h4" sx={{ textAlign:"center", mt: 2 ,mb:3, color: (theme) => theme.palette.info.main }}>
          Consentements
        </Typography>
        <DataGrid
            columns={columns}
            rows={consentements}
          />
        </Box>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default PageConsentements;