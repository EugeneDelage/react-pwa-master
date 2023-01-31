import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import DateFilter from '@inovua/reactdatagrid-community/DateFilter'
import moment from 'moment';
import { useState,useEffect } from 'react';

function PageConsentements() {
  const [consentements,consentementschange] = useState(null);
  useEffect(()=> {
    fetch("http://localhost:3000/consentements").then((res) => {
      return res.json();
  }).then((resp)=>{
    console.log(resp);
  }).catch((err) =>{
    console.log(err.message);
  });
  },[]);



  const columns = [
    { name: 'id', header: 'Id', defaultVisible: false, defaultWidth: 80, type: 'number' },
    { name: 'requerant', header: 'Requérant', defaultFlex: 1 },
    { name: 'equipeelu', header: 'Équipe Élu', defaultFlex: 1},
    {
      name: 'demandeDate',
      header: 'Date demande',
      defaultFlex: 1,
      minWidth: 200,
      filterEditor: DateFilter,
      filterEditorProps: (props, { index }) => {
        // for range and notinrange operators, the index is 1 for the after field
        return {
          dateFormat: 'YYYY-MM-DD',
          cancelButton: false,
          highlightWeekends: false,
          placeholder: index == 1 ? 'Date est avant...': 'Date est après...'
        }
      },
      render: ({ value }) => {
        return moment(value).format('YYYY-MM-DD')
      }
    },
    {
      name: 'relanceDate',
      header: 'Date relance',
      defaultFlex: 1,
      minWidth: 200,
      filterEditor: DateFilter,
      filterEditorProps: (props, { index }) => {
        // for range and notinrange operators, the index is 1 for the after field
        return {
          dateFormat: 'YYYY-MM-DD',
          cancelButton: false,
          highlightWeekends: false,
          placeholder: index == 1 ? 'Date est avant...': 'Date est après...'
        }
      },
      render: ({ value }) => {
        return moment(value).format('YYYY-MM-DD')
      }
    },

  ];
  
  const gridStyle = { minHeight: 600 }


  const filterValue = [
    { name: 'requerant', operator: 'startsWith', type: 'string', value: '' },
    { name: 'equipeelu', operator: 'startsWith', type: 'string', value: '' },    
    { name: 'relanceDate', operator: 'before', type: 'date',  value: '' },
    { name: 'demandeDate', operator: 'before', type: 'date',  value: '' } ,   
  ];
  
  return (
    <>
      <Meta title="Consentements" />
      <Typography variant="h4">Consentements</Typography>
      <FullSizeCenteredFlexBox>
      <ReactDataGrid
        idProperty="id"
        style={gridStyle}
        defaultFilterValue={filterValue}
        columns={columns}
        dataSource={consentements}
      />
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default PageConsentements;


