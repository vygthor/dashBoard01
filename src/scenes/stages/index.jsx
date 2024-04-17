import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from '../../theme';
import Header from "../../compoments/Header";
import { useEffect,useState } from "react";
import { AddOutlined, DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from  "yup";


const initialValues = {
    nameStage: "",
    descriptionStage: "",
};

const stageScheme = yup.object().shape({
    nameStage : yup.string().required('required'),
    descriptionStage : yup.string().required('required')
})


const Stages = () => {

    const [stageId,setStageId] = useState();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [openStageForm,setOpenStageForm] = useState(false)
    
    const [openMsg,setOpenMsg] = useState(false);
    const [typeMsg,setTypeMsg] = useState("");
    const [msgText,setMsgText] = useState("");
    const [openQst,setOpenQst] = useState(false);
    
    

    const [allStages,setAllStages] = useState([]);

    //BRING 
    useEffect(()=>{
        getAllStages();
        
    },[]);

    //GET ALL  STAGES FROM DATABASE 
    const  getAllStages = async()=>{
        const res = await fetch('http://localhost:4000/etapas/');
        const datos = await res.json();
        //console.log(datos);
        
        setAllStages(datos);  
    }

    
    

    const columns = [
        {
            field: "id", headerName: "Id Stage"
        },
        {
            field: "nombre_etapa", headerName: "Stage Name"
        },
        
        {
            field: "edit",
            headerName: " ",
            width: 20,
            renderCell: (rowSelected) => (
                
              <IconButton onClick={() => (
                handleUpdateStage(rowSelected.id)
              )
                
              }>
                <EditOutlined />
              </IconButton>
              
              
            )
          },
          {
            field: "action",
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

//    const parseJSON = (sData)=>{
//         sData.map((d) =>  (
            
//         )  )
//    }

    const handleCloseQst = () => {
        setOpenQst(false);
    };

    const handleQuestion = (id) => {
        setOpenQst(true);
        setStageId(id);
    }

    const handleNewStage = () => {
        setStageId(null);
        initialValues.nameStage = null;
        initialValues.descriptionStage = null;
        setOpenStageForm(true);
    };

    const handleUpdateStage = async (id) => {
        
        const response = await fetch(`http://localhost:4000/etapas/${id}`,{
            method: 'GET'
        });
        const data = await response.json();
        
        initialValues.nameStage = data[0].nombre_etapa;
        initialValues.descriptionStage =  data[0].descripcion_etapa;
        setStageId(id);
        setOpenStageForm(true);
    };

    const handleDeleteStage = async () => {

        try {
            await fetch(`http://localhost:4000/etapas/${stageId}`,{
            method:'DELETE'
          })
        setMsgText('Stage deleted successfully!!!');
        setTypeMsg('success');
        setOpenMsg(true);
        getAllStages();
          
          
          } catch (error) {
            setMsgText('Error on deleting storage!!!');
            setTypeMsg('errors');
            setOpenMsg(true);
            getAllStages();
            
          } 
          setOpenQst(false);
    };

    const handleSubmitStage = async (values) => {
      //alert(JSON.stringify(values, null, 2));
      //alert(stageId) 
      if(stageId)
       {
          
        try {
                await fetch(
                    `http://localhost:4000/etapas/${stageId}` ,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(values, null, 2),
                    }
                );
            setMsgText('Stage updated successfully!!!');
            setTypeMsg('success');
            setOpenMsg(true);
            getAllStages();
        } 
        catch (error) {
            setMsgText(`Error on updating stage ${error}`);
            setTypeMsg('error');
            setOpenMsg(true);
            
        }
       }else
       {
            try {
            await fetch('http://localhost:4000/etapas/',{
                method: "POST", 
                body: JSON.stringify(values, null, 2), 
                headers: { "Content-Type": "application/json" },
                });

                setMsgText('Stage created successfully!!!');
                setTypeMsg('success');
                setOpenMsg(true);
                getAllStages();
            
        } catch (error) {
            setMsgText(`Error on creating new stage ${error}`);
            setTypeMsg('error');
            setOpenMsg(true);
        }
       }
       setOpenStageForm(false);
    }

    const handleCloseMsg = () => {
        setOpenMsg(false);
    }
     

   return(
    <>
    <Box m = "5px">
        <Box display="flex" p={2} m='1px'>
            <Box display="flex">
                <Header title="Stages" subtitle="Stages List"/>
            </Box>
            <Box display="flex" m={"10px"} sx={{backgroundColor:'transparent',alignContent:'baseline'}}>
                <Button variant="outlined" sx={{
                    backgroundColor: colors.greenAccent[600],
                    "&:hover": {background: colors.blueAccent[700], color:colors.greenAccent[100]},
                    "height": "40px"
                    }
                    }
                    startIcon = {<AddOutlined />}
                    onClick={handleNewStage}
                    
                >
                    New stage
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
            <Box m='1px'
                
            >
                <DataGrid
                    columns={columns}
                    rows={allStages}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                      }}
                      pageSizeOptions={[5, 10, 25]}
                />
            </Box>
        </Box>

    </Box>
    <Dialog open= {openStageForm}>
        <Formik
            onSubmit={handleSubmitStage}
            validationSchema={stageScheme}
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
                            sx={{m: '5px'}}>
                            
                            {stageId ? "Edit Stage":"Create New Stage"}
                        </Typography>
                    </Box>
                    <Box sx={{background: colors.primary[400]}}>
                        <TextField 
                            fullWidth
                            variant="filled"
                            type="text"
                            label= "Name Stage"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.nameStage}
                            name="nameStage"
                            error = {!!touched.nameStage && !!errors.nameStage}    
                            helperText = {touched.nameStage && errors.nameStage}  
                        />
                        <TextField 
                            fullWidth
                            variant="filled"
                            type="text"
                            label= "Description Stage"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.descriptionStage}
                            name="descriptionStage"
                            error = {!!touched.descriptionStage && !!errors.descriptionStage}    
                            helperText = {touched.descriptionStage && errors.descriptionStage}  
                        
                        />

                    </Box>
                    <Box 
                        display="flex" 
                        justifyContent="end" 
                        alignContent="center"
                        
                        height='5vh'
                        sx={{background:colors.greenAccent[100]}        
                        }>
                        <Button 
                            type="submit"  
                            variant="contained"
                            sx={{
                                backgroundColor: colors.greenAccent[600],
                                "&:hover": {background: colors.blueAccent[700], color:colors.greenAccent[100]},
                                "height": "30px",marginRight:'10px',
                                marginTop:'2px'
                                }
                                }
                            >
                            {stageId ? 'Save': 'Create' }
                        </Button>
                        <Button
                            variant="contained"
                            sx={{"height": "30px",
                            marginRight:'10px',
                            marginTop:'2px'    }}
                            onClick={()=>setOpenStageForm(false)} 
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
                Delete stage
            </Typography>
        </DialogTitle> 
        <DialogContent 
            sx={{background:colors.primary[500],
                alignContent: 'baseline',
                textAlign: 'left'
            }}
            
        >
            <Typography>
                Desea eliminar la etapa?
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
                onClick={handleDeleteStage}
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

export default Stages;