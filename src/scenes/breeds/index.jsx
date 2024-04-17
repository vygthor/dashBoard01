import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, TextField, Typography, useTheme } from "@mui/material";
import Header from "../../compoments/Header";
import { AddOutlined, DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from  "yup";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const initialValues = {
    nameBreed: "",
    descriptionBreed: "",
};

const breedScheme = yup.object().shape({
    nameBreed : yup.string().required('required'),
    descriptionBreed : yup.string().required('required')
})

const Breeds = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [breedId,setBreedId] = useState();
    const [openBreedForm,setOpenBreedForm] = useState(false)
    const [openMsg,setOpenMsg] = useState(false);
    const [typeMsg,setTypeMsg] = useState("");
    const [msgText,setMsgText] = useState("");
    const [openQst,setOpenQst] = useState(false);
    const [allBreeds,setAllBreeds] = useState([]);

    //  BRING ALL BREEDS
    useEffect(()=>{
        getAllBreeds();
        
    },[]);

    //GET ALL  BREEDS FROM DATABASE 
    const  getAllBreeds = async()=>{
        const res = await fetch('http://localhost:4000/razas/');
        const datos = await res.json();
        setAllBreeds(datos);  
    }

    const columns = [
        {
            field: "id", headerName: "Id Breed"
        },
        {
            field: "nombre_raza", headerName: "Breed Name"
        },
        
        {
            field: "edit",
            headerName: " ",
            width: 20,
            renderCell: (rowSelected) => (
                
              <IconButton onClick={() => (
                handleUpdateBreed(rowSelected.id)
                
              )
                
              }>
                <EditOutlined />
              </IconButton>
              
              
            )
          },
          {
            field: "delete",
            headerName: " ",
            width: 20,
            renderCell: (param) => (
                
              <IconButton onClick={() => (
                
                 handleQuestion(param.id)
                 
               
                )}>
                <DeleteOutlineOutlined />
              </IconButton>
                
              
            )
          },
    ]   

    const handleCloseQst = () => {
        setOpenQst(false);
    };

    const handleQuestion = (id) => {
        setOpenQst(true);
        setBreedId(id);
    }

    const handleNewBreed = () => {
        setBreedId(null);
        initialValues.nameBreed = null;
        initialValues.descriptionBreed = null;
        setOpenBreedForm(true);
    };

    //UPDATINF BREED
    const handleUpdateBreed = async (id) => {
        
        const response = await fetch(`http://localhost:4000/razas/${id}`,{
            method: 'GET'
        });
        const data = await response.json();
        console.log(data)
        initialValues.nameBreed = data[0].nombre_raza;
        initialValues.descriptionBreed =  data[0].descripcion;
        setBreedId(id);
        setOpenBreedForm(true);
    };

    const handleDeleteBreed = async () => {

        try {
            await fetch(`http://localhost:4000/razas/${breedId}`,{
            method:'DELETE'
          })
        setMsgText('Breed deleted successfully!!!');
        setTypeMsg('success');
        setOpenMsg(true);
        getAllBreeds();
          
          
          } catch (error) {
            setMsgText('Error on deleting breed!!!');
            setTypeMsg('errors');
            setOpenMsg(true);
            getAllBreeds();
            
          } 
          setOpenQst(false);
    };

    const handleSubmitBreed = async (values) => {
        //alert(JSON.stringify(values, null, 2));
        //alert(stageId) 
        if(breedId)
         {
            
          try {
                  await fetch(
                      `http://localhost:4000/razas/${breedId}` ,
                      {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(values, null, 2),
                      }
                  );
              setMsgText('Breed updated successfully!!!');
              setTypeMsg('success');
              setOpenMsg(true);
              getAllBreeds();
          } 
          catch (error) {
              setMsgText(`Error on updating breed ${error}`);
              setTypeMsg('error');
              setOpenMsg(true);
              
          }
         }else
         {
              try {
              await fetch('http://localhost:4000/razas/',{
                  method: "POST", 
                  body: JSON.stringify(values, null, 2), 
                  headers: { "Content-Type": "application/json" },
                  });
  
                  setMsgText('Breed created successfully!!!');
                  setTypeMsg('success');
                  setOpenMsg(true);
                  getAllBreeds();
              
          } catch (error) {
              setMsgText(`Error on creating new breed ${error}`);
              setTypeMsg('error');
              setOpenMsg(true);
          }
         }
         setOpenBreedForm(false);
      }

      const handleCloseMsg = () => {
        setOpenMsg(false);
    }

    return (
        <>
            <Box m="5px">
                <Box display="flex" p={2} m='1px'>
                    <Box display="flex">
                        <Header title='Breeds' subtitle='Manage Breeds' />  
                    </Box>
                <Box display="flex" m={"10px"} sx={{backgroundColor:'transparent',alignContent:'baseline'}}>
                    <Button variant="outlined" sx={{
                        backgroundColor: colors.greenAccent[600],
                        "&:hover": {background: colors.blueAccent[700], color:colors.greenAccent[100]},
                        "height": "40px"
                        }
                    }
                    startIcon = {<AddOutlined  />}
                    onClick={handleNewBreed}
                    
                >
                    New Breed
                </Button>
                </Box>
            </Box>
            <Box
                m="40px 450px 50px 400px"
                height= "100vh"
                sx={{
                    "& .MuiDataGrid-root":{
                        border: "none"
                    },
                    "& .MuiDataGrid-cell":{
                        borderBottom: "none"
                    },
                    "& .name-column--cel":{
                        color: colors.greenAccent[300]
                    },
                    "& .MuiDataGrid-columnHeaders":{
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400]
                    },
                    "& .MuiDataGrid-footerContainer":{
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700]
                    
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                      },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                      },
                }}
            >
                 <Box 
                    m='1px'
                >
                    <DataGrid
                        columns={columns}
                        rows={allBreeds}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                          }}
                          pageSizeOptions={[5, 10, 25]}
                    />
                </Box>
            </Box>
            </Box>
            <Dialog open= {openBreedForm}>
                <Formik
                    onSubmit={handleSubmitBreed}
                    validationSchema={breedScheme}
                    initialValues={initialValues}
                >
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit })=> (

                        <form onSubmit={handleSubmit}> 
                            <Box 
                                height='5vh'
                                alignContent='center'
                                sx={{
                                    background: colors.greenAccent[700]
                            }}>
                                <Typography 
                                    variant="h5"
                                    fontWeight='bold'
                                    sx={{m: '5px'}}
                                >
                                    {breedId ? "Edit Breed":"Create New Breed"}
                                 </Typography>
                            </Box>
                            <Box sx={{background: colors.primary[400]}}>
                                <TextField 
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label= "Name Breed"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.nameBreed}
                                    name="nameBreed"
                                    error = {!!touched.nameBreed && !!errors.nameBreed}    
                                    helperText = {touched.nameBreed && errors.nameBreed}  
                                />
                                <TextField 
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label= "Description Breed"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.descriptionBreed}
                                    name="descriptionBreed"
                                    error = {!!touched.descriptionBreed && !!errors.descriptionBreed}    
                                    helperText = {touched.descriptionBreed && errors.descriptionBreed}  
                                />
                            </Box>
                            <Box 
                                display="flex" 
                                justifyContent="end" 
                                alignContent="center"
                                height='5vh'
                                sx={{background:colors.greenAccent[100]}}
                            >
                                <Button 
                                    type="submit"  
                                    variant="contained"
                                    sx={{
                                        backgroundColor: colors.greenAccent[600],
                                        "&:hover": {background: colors.blueAccent[700], color:colors.greenAccent[100]},
                                        "height": "30px",marginRight:'10px',
                                        marginTop:'2px'
                                        }}
                                >
                                    {breedId ? 'Save': 'Create' }
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{"height": "30px",
                                    marginRight:'10px',
                                    marginTop:'2px'    }}
                                    onClick={()=>setOpenBreedForm(false)} 
                                >
                                    Close
                                </Button>
                            </Box>

                </form>

            )}
        </Formik>
    </Dialog>
    <Snackbar open={openMsg} autoHideDuration={1000} onClose={handleCloseMsg}>
        <Alert
          onClose={handleCloseMsg}
          severity={typeMsg}
          variant="filled"
          sx={{ width: '100%' }}
          
        >
          {msgText}
        </Alert>
    </Snackbar>
    <Dialog open={openQst} onClose={handleCloseQst} >
        <DialogTitle 
            sx={{backgroundColor:colors.greenAccent[700]}}
            height='6vh'
            alignContent='center'
            display='flex' 
                             
        >
            <DeleteOutlineOutlined />
            <Typography
                variant="h5"
                fontWeight='bold'
                
            >
                Delete breed
            </Typography>
        </DialogTitle> 
        <DialogContent 
            sx={{background:colors.primary[500],
                alignContent: 'baseline',
                textAlign: 'left'
            }}
            
        >
            <Typography>
                Desea eliminar la raza?
            </Typography>
        </DialogContent>  
        <DialogActions 
        sx={{backgroundColor:'white'}}
        >
            <Button
                variant="contained"
                sx={{
                    backgroundColor: colors.greenAccent[600],
                    "&:hover": {background: colors.blueAccent[700], color:colors.greenAccent[100]},
                    "height": "30px",marginRight:'10px',
                    marginTop:'2px'
                    }
                    }
                onClick={handleDeleteBreed}
            >
                Delete
            </Button>
            <Button
                variant="contained"
                sx={{"height": "30px",
                marginRight:'10px',
                marginTop:'2px'    }}
                onClick={handleCloseQst}
            >
                Close
            </Button>
        </DialogActions>                       
      </Dialog>





    </>
    )

}

export default Breeds;