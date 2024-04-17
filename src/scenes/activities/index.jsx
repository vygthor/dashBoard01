import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from '../../theme';
import Header from "../../compoments/Header";
import { useEffect,useState } from "react";
import { AddOutlined, DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from  "yup";


const initialValues = {
    nameActivity: "",
    descriptionActivity: "",
};

const activityScheme = yup.object().shape({
    nameActivity : yup.string().required('required'),
    descriptionActivity : yup.string().required('required')
})



const Activities = () =>{
    const [activityId,setActivityId] = useState();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [openActivityForm,setOpenActivityForm] = useState(false)
    
    const [openMsg,setOpenMsg] = useState(false);
    const [typeMsg,setTypeMsg] = useState("");
    const [msgText,setMsgText] = useState("");
    const [openQst,setOpenQst] = useState(false);
    
    

    const [allActivities,setAllActivities] = useState([]);

    //BRING 
    useEffect(()=>{
        getAllActivities();
        
    },[]);

    //GET ALL  STAGES FROM DATABASE 
    const  getAllActivities = async()=>{
        const res = await fetch('http://localhost:4000/actividades/');
        const datos = await res.json();
        //console.log(datos);
        
        setAllActivities(datos);  
    }

    const columns = [
        {
            field: "id", headerName: "Id Activity"
        },
        {
            field: "nombre_actividad", headerName: "Activity Name"
        },
        
        {
            field: "edit",
            headerName: " ",
            width: 20,
            renderCell: (rowSelected) => (
                
              <IconButton onClick={() => (
                handleUpdateActivity(rowSelected.id)
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

    const handleCloseQst = () => {
        setOpenQst(false);
    };

    const handleQuestion = (id) => {
        setOpenQst(true);
        setActivityId(id);
    }

    const handleNewActivity = () => {
        setActivityId(null);
        initialValues.nameActivity = null;
        initialValues.descriptionActivity = null;
        setOpenActivityForm(true);
    };

    const handleUpdateActivity = async (id) => {
        
        const response = await fetch(`http://localhost:4000/actividades/${id}`,{
            method: 'GET'
        });
        const data = await response.json();
        //console.log(data.sActividades.rows[0].nombre_actividad)
        
        initialValues.nameActivity = data.sActividades.rows[0].nombre_actividad;
        initialValues.descriptionActivity =  data.sActividades.rows[0].detalle_actividad;
        setActivityId(id);
        setOpenActivityForm(true);
    };

    const handleDeleteActivity = async () => {

        try {
            await fetch(`http://localhost:4000/actividades/${activityId}`,{
            method:'DELETE'
          })
        setMsgText('Activity deleted successfully!!!');
        setTypeMsg('success');
        setOpenMsg(true);
        getAllActivities();
          
          
          } catch (error) {
            setMsgText('Error on deleting activity!!!');
            setTypeMsg('errors');
            setOpenMsg(true);
            getAllActivities();
            
          } 
          setOpenQst(false);
    };

    const handleSubmitActivity = async (values) => {
      //alert(JSON.stringify(values, null, 2));
      //alert(stageId) 
      if(activityId)
       {
          
        try {
                await fetch(
                    `http://localhost:4000/actividades/${activityId}` ,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(values, null, 2),
                    }
                );
            setMsgText('Activity updated successfully!!!');
            setTypeMsg('success');
            setOpenMsg(true);
            getAllActivities();
        } 
        catch (error) {
            setMsgText(`Error on updating activity ${error}`);
            setTypeMsg('error');
            setOpenMsg(true);
            
        }
       }else
       {
            try {
            await fetch('http://localhost:4000/actividades/',{
                method: "POST", 
                body: JSON.stringify(values, null, 2), 
                headers: { "Content-Type": "application/json" },
                });

                setMsgText('Activity created successfully!!!');
                setTypeMsg('success');
                setOpenMsg(true);
                getAllActivities();
            
        } catch (error) {
            setMsgText(`Error on creating new activity ${error}`);
            setTypeMsg('error');
            setOpenMsg(true);
        }
       }
       setOpenActivityForm(false);
    }

    const handleCloseMsg = () => {
        setOpenMsg(false);
    }
     



return (
    <>
    <Box m = "5px">
        <Box display="flex" p={2} m='1px'>
            <Box display="flex">
                <Header title="Activities" subtitle="Activities List"/>
            </Box>
            <Box display="flex" m={"10px"} sx={{backgroundColor:'transparent',alignContent:'baseline'}}>
                <Button variant="outlined" sx={{
                    backgroundColor: colors.greenAccent[600],
                    "&:hover": {background: colors.blueAccent[700], color:colors.greenAccent[100]},
                    "height": "40px"
                    }
                    }
                    startIcon = {<AddOutlined />}
                    onClick={handleNewActivity}
                    
                >
                    New activity
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
                    rows={allActivities}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                      }}
                      pageSizeOptions={[5, 10, 25]}
                />
            </Box>
        </Box>

    </Box>
    <Dialog open= {openActivityForm}>
        <Formik
            onSubmit={handleSubmitActivity}
            validationSchema={activityScheme}
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
                            
                            {activityId ? "Edit Activity":"Create New Activity"}
                        </Typography>
                    </Box>
                    <Box sx={{background: colors.primary[400]}}>
                        <TextField 
                            fullWidth
                            variant="filled"
                            type="text"
                            label= "Name Activity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.nameActivity}
                            name="nameActivity"
                            error = {!!touched.nameActivity && !!errors.nameActivity}    
                            helperText = {touched.nameActivity && errors.nameActivity}  
                        />
                        <TextField 
                            fullWidth
                            variant="filled"
                            type="text"
                            label= "Description Activity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.descriptionActivity}
                            name="descriptionActivity"
                            error = {!!touched.descriptionActivity && !!errors.descriptionActivity}    
                            helperText = {touched.descriptionActivity && errors.descriptionActivity}  
                        
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
                            {activityId ? 'Save': 'Create' }
                        </Button>
                        <Button
                            variant="contained"
                            sx={{"height": "30px",
                            marginRight:'10px',
                            marginTop:'2px'    }}
                            onClick={()=>setOpenActivityForm(false)} 
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
                onClick={handleDeleteActivity}
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

export default Activities;