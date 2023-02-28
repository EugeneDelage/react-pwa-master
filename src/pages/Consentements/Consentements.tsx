/* eslint-disable react/jsx-key */
// material
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { DataGrid , GridColumns, GridRowId, frFR } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

// PrimeReact
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
// react
import { useState,useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import * as React from 'react';

// data
import { ConsentementApiService } from '@/api/ConsentementService';
import { Consentement } from '@/models/Consentement';
import { Card, CardActions, CardContent, CardHeader, Tooltip } from '@mui/material';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Nullable } from 'primereact/ts-helpers';

function Consentements() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [consentements, setConsentements] = useState<Consentement>([]);
  const [open, setOpen] = useState(false);

  type Row = typeof consentements[number];

  const handleRelance = (params) => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log('Close button');
    setOpen(false);
  };
  
  useEffect(() => {
    getConsentements();
  }, [])

  const getConsentements = async () =>{
      const response = await ConsentementApiService.getAllConsentements();
      console.log(`reponse=${ JSON.stringify(response)}`);
      setConsentements(response.data);
  }

  const navigate = useNavigate(); 
  const openConsentement = useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        navigate(`/consentement/${id}`);
      });
    },
    [],
  );
 const createConsentement= useCallback(
  () => {
    setTimeout(() => {
      navigate(`/consentementadd/`);
    });
  }
);
  const columns = useMemo<GridColumns<Row>>(
    () => [
      { field: 'id'         , type: 'number' , headerName: 'Id'             ,width: 60 },
      { field: 'requerant'  , type: 'string' , headerName: 'Requérant'      ,width: 200},
      { field: 'equipeelu'  , type: 'string' , headerName: 'Équipe Élu'     ,width: 200},
      { field: 'demandeDate', type: 'date'   , headerName: 'Date demande'   ,width: 150},
      { field: 'relanceDate', type: 'date'   , headerName: 'Date de relance',width: 150},
      {
        field: 'actions'    , type: 'actions', headerName: 'Actions'        , width: 120,
        renderCell:(params)=><Box>
          <Tooltip title="Consulter consentement">
            <OpenInNewIcon onClick={openConsentement(params.id)} />
          </Tooltip>
          <Tooltip title="Relancer">
            <HowToRegIcon onClick={()=>handleRelance(params)}/>
          </Tooltip>
        </Box>,
      },
    ],
    [openConsentement],
  );

  // Primereact table config
  const footer = `Il y a  ${consentements ? consentements.length : 0} consentements.`;
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    requerant: { value: null, matchMode: FilterMatchMode.CONTAINS },
    equipeelu: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const formatDate = (value:Date) => {
    return value;

    // return value.toLocaleDateString('fr-CA', {
    //     day: '2-digit',
    //     month: '2-digit',
    //     year: 'numeric'
    // });
  };
  const initFilters = () => {
    setFilters({
        global:                                                    { value: null, matchMode: FilterMatchMode.CONTAINS },
        requerant:   { constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        equipeelu:   { constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        relanceDate: { constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]  },
        demandeDate: { constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]  },
        // requerant:   { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        // equipeelu:   { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        // relanceDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]  },
        // demandeDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]  },
  
    });
    setGlobalFilterValue('');
  };
  const clearFilter = () => {
    initFilters();
  };
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button type="button" icon="pi pi-filter-slash" label="Effacer" outlined onClick={clearFilter} />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Recherche globale" />
        </span>
      </div>
    );
  };
  const header = renderHeader();
  
  const actionOpenConsentement= (rowData) => {
    return (
      <Box>
          <Tooltip title="Consulter consentement">
            <OpenInNewIcon onClick={openConsentement(rowData.id)} />
          </Tooltip>
          <Tooltip title="Relancer">
            <HowToRegIcon onClick={()=>handleRelance(rowData)}/>
          </Tooltip>
        </Box>
    );
  }
  const demandeDateBodyTemplate = (rowData: { demandeDate: Date; }) => {
    return formatDate(rowData.demandeDate);
  };
  const relanceDateBodyTemplate = (rowData: { relanceDate: Date; }) => {
    return formatDate(rowData.relanceDate);
  };
  const dateFilterTemplate = (options: { value: string | Date | Date[] | null | undefined; filterCallback: (arg0: Nullable<string | Date | Date[]>, arg1: any) => void; index: any; }) => {
    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="yyyy/mm/dd" placeholder="yyyy/mm/dd" mask="9999/99/99" />;
  };

  return (
    <>
      <Meta title="Consentements" />
      <FullSizeCenteredFlexBox>
        <Box sx={{ height:'100%',width:'100%' }}>

        <Card style={{height:'100%',width:'100%'}}>
          <CardHeader 
            title={
              <Typography variant="h4" align='center'>
                 Consentements en attente
              </Typography>
            }>
          </CardHeader>
          <CardContent>  
            {/* <Container sx={{  height:`calc(100vh - 250px)`}}> */}
              <DataTable value={consentements}
                dataKey="id"
                 showGridlines 
                 tableStyle={{ minWidth: '50rem' }}
                 footer={footer}
                 size="small"
                 columnResizeMode="expand" 
                 resizableColumns
                 stripedRows 
                 selectionMode="single"
                 paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                 removableSort 
                 sortField="demandeDate"
                 sortOrder={-1}
                 filters={filters} 
                 filterDisplay="row"
                 globalFilterFields={['requerant', 'demandeDate', 'relanceDate','equipeelu']}
                 header={header} 
                 emptyMessage="Aucun consentement pour cette recherche."
                 >
                <Column field="requerant" sortable filter filterPlaceholder="Chercher par requérant" style={{ minWidth: '12rem' }}  header="Requérant"></Column> 
                <Column field="equipeelu" sortable filter filterPlaceholder="Chercher par élu" style={{ minWidth: '12rem' }} header="Équipe Élu"></Column>
                <Column field="demandeDate" filterField="demandeDate" dataType="date" body={demandeDateBodyTemplate} filterElement={dateFilterTemplate} sortable filter filterPlaceholder="Chercher par date de demande" header="Date demande"></Column>
                <Column field="relanceDate" filterField="relanceDate" dataType="date" body={relanceDateBodyTemplate} filterElement={dateFilterTemplate} sortable filter filterPlaceholder="Chercher par date de relance" header="Date relance"></Column>
                <Column header="Actions"
                        body={actionOpenConsentement}
                        style={{ textAlign: "center", width: "8em" }}
                />
              </DataTable>

              {/* <DataGrid
                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={consentements}
              /> */}
            {/* </Container> */}
          </CardContent>
          <CardActions sx={{
             alignSelf: "stretch",
             display: "flex",
             justifyContent: "center",
             }}>
            <Button type="button" label="Demander un consentement" onClick={createConsentement} />
          </CardActions>
        </Card>
        </Box>        
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">
          {"Relance de consentement?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            La demande initiale de consentement a été effectuée le {}. 
            Souhaitez vous relancer le citoyen pour cette demande?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="button" label="Annuler" outlined onClick={handleClose}/>
          <Button type="button" label="Confirmer" outlined onClick={handleClose} autoFocus/>
        </DialogActions>
        </Dialog>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Consentements;