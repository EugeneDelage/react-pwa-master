import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { DataGrid, GridColDef, GridRowId, GridValueGetterParams } from '@mui/x-data-grid';

import { useCallback, useState } from 'react';
import { Box } from '@mui/system';
import { Card, CardContent, CardHeader, Tooltip } from '@mui/material';
import { useNavigate } from "react-router-dom";


function PageRequetesCitoyennes() {
  
  const navigate = useNavigate(); 
  const openRequete = useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        navigate(`/requetecitoyenne/${id}`);
      });
    },
    [],
  );

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'lue',
      headerName: 'Lue',
      width: 150,
      editable: true,
    },
    {
      field: 'requestno',
      headerName: 'Numéro requête',
      width: 150,
      editable: true,
    },
    {
      field: 'requerant',
      headerName: 'Requérant',
      type: 'string',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'actions'    , type: 'actions', headerName: 'Actions'        , width: 120,
      renderCell:(params)=><Box>
        <Tooltip title="Consulter la requête">
          <OpenInNewIcon onClick={openRequete(params.id)} />
        </Tooltip>
      </Box>,
    },  
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  
  const [value, setValue] = useState('1');
  
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleRowClick  =()=>{

  }
  return (
    <>
      <Meta title="Requêtes Citoyennes" />
      <FullSizeCenteredFlexBox>
      <Card sx={{ width: '100%'}}>
        <CardHeader 
          title="Requêtes citoyennes">
        </CardHeader>
        <CardContent>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Sans suivi" value="1" />
              <Tab label="Avec suivi" value="2" />
              <Tab label="Toutes" value="3" />
            </TabList>
           </Box>
          <TabPanel value="1">
          <div style={{height:400, width:'100%'}}>
            <DataGrid
               rows={rows}
               columns={columns}                
               pageSize={3}
               onRowClick={handleRowClick}
             />
          </div>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
        </CardContent>
      </Card>        
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default PageRequetesCitoyennes;
