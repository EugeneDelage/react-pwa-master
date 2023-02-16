// Material
import Meta from "@/components/Meta";
import { FullSizeCenteredFlexBox } from "@/components/styled";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

// react
import { useCallback, useState } from "react";

function PageDemandeEluAdd() {
    const [equipe, setEquipe] = useState('');
    const [typeDemande,setTypeDemande] = useState('');

    const [tabValue, setTabValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
      };

    const handleChangeEquipe = (event: SelectChangeEvent) => {
        setEquipe(event.target.value as string);
    };      
    const handleChangeTypeDemande= (event: SelectChangeEvent) => {
        setTypeDemande(event.target.value as string);
    };      
    const joinFile= () => {
      setTimeout(() => {
        console.log("joinFile");
      });
    };
    const sendForValidation= () => {
      setTimeout(() => {
        console.log("sendForValidation");
      });
    };

    const saveDemande= () => {
      setTimeout(() => {
        console.log("saveDemande");
      });
    };
    const cancelDemande= () => {
      setTimeout(() => {
        console.log("cancelDemande");
      });
    };
      
    return (
      <>
        <Meta title="Demande Elu" />
        <FullSizeCenteredFlexBox>
        <Box sx={{ height:'100%',width:'100%' }}>
          <Card style={{height:'100%',width:'100%'}}>
            <CardContent>
              <Box sx={{ border: 2, borderRadius: 5,marginTop:1,maxHeight:550,minWidth: 650 }}>
                <TabContext value={tabValue}>
                  <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Demande" value="1" />
                      <Tab label="Communications DG" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel sx={{  height:`calc(100vh - 182px)`,width: 650}} value="1">  
                     <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                           <TextField  multiline variant="filled" 
                             fullWidth
                            defaultValue="Tremblay, Mathieu
                            123, rue abc
                            Localisation de la problématique: 3, Terrasse Debien"
                           />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <TextField  multiline variant="filled" 
                             fullWidth
                             defaultValue="Requête: RC-528-130 -Y2TB
                             Type: INT bac brisé
                             No Requête:"
                           />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputLabel id="ilequipe">Équipe</InputLabel>
                          <Select
                              fullWidth
                              labelId="ilequipe"
                              id="demo-simple-select"
                              value={equipe}
                              label="Équipe"
                              onChange={handleChangeEquipe}
                              >
                              <MenuItem value={1}>Équipe 1</MenuItem>
                              <MenuItem value={2}>Équipe 2</MenuItem>
                              <MenuItem value={3}>Équipe 3</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id="iltypedemande">Type de demandes</InputLabel>
                            <Select
                              fullWidth
                              labelId="iltypedemande"
                              id="demo-simple-select"
                              value={typeDemande}
                              label="Type de demande"
                              onChange={handleChangeTypeDemande}
                              >
                              <MenuItem value={1}>Type demande 1</MenuItem>
                              <MenuItem value={2}>Type demande 2</MenuItem>
                              <MenuItem value={3}>Type demande 3</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <TextField  variant="filled" 
                             fullWidth
                             label="Statut"
                             disabled
                            defaultValue="Brouillon"
                           />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <TextField variant="filled" 
                             fullWidth
                             label="Raison"
                             disabled
                             defaultValue="En cours"
                           />
                        </Grid>
                    </Grid>
              </TabPanel>
              <TabPanel sx={{  height:`calc(100vh - 182px)`,width: 650}} value="2">
              </TabPanel>
             </TabContext>
             </Box>      
            </CardContent>
            <CardActions sx={{
             alignSelf: "stretch",
             display: "flex",
             justifyContent: "center",
             }}>
            <Button variant='contained' onClick={joinFile} >
              Joindre un fichier
            </Button>
            <Button variant='contained' onClick={sendForValidation} >
              Transmettre pour validation
            </Button>
            <Button variant='contained' onClick={saveDemande} >
              Sauvegarder
            </Button>
            <Button variant='contained' onClick={cancelDemande} >
              Annuler la demande
            </Button>
          </CardActions>
          </Card>
        </Box>  
        </FullSizeCenteredFlexBox>
      </>
    );
  }
  
  export default PageDemandeEluAdd;
  