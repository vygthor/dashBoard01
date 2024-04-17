
import { Box, Button, FormControlLabel, Grid, IconButton, MenuItem, Radio, RadioGroup, Select, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../compoments/Header";
import { AddOutlined, DeleteOutlineOutlined, EditOutlined, Label } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputLabel from '@mui/material/InputLabel';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Formik } from "formik";
import * as yup from  "yup";
import InputAdornment from '@mui/material/InputAdornment'
import Dialog from '@mui/material/Dialog'


const initialValuesPurchase = {
    codeLamb: "",
    idBreed:"",
    id: "",
    sexLamb:"",
    nameLamb: "",
    weightLamb: "",
    codeMother: "",
    codeFather: "",
    ageLamb: "",
    datePurchase: "",
    priceLamb:"",
    provenienceLamb: "",
    commentsLamb: ""
};

const initialValuesBirth = {
    codeLamb: "",
    idBreed:"",
    idCategory: "",
    sexLamb:"",
    nameLamb: "",
    weightLamb: "",
    codeMother: "",
    codeFather: "",
    ageLamb: "",
    datePurchase: "",
    priceLamb:"",
    provenienceLamb: "",
    commentsLamb: ""
};


const lambPurchaseScheme = yup.object().shape({
    nameCategory : yup.string().required('required'),
    descriptionCategory : yup.string().required('required'),
    codeLamb: yup.string().required('required'),
    idBreed:yup.string().required('required'),
    id: yup.string().required('required'),
    sexLamb:yup.string().required('required'),
    nameLamb: yup.string().required('required'),
    weightLamb: yup.string().required('required'),
    codeMother: yup.string().required('required'),
    codeFather: yup.string().required('required'),
    ageLamb: yup.string().required('required'),
    datePurchase: yup.string().required('required'),
    priceLamb:yup.string().required('required'),
    provenienceLamb: yup.string().required('required'),
    commentsLamb: yup.string().required('required')
})

const lambBithScheme = yup.object().shape({
    nameCategory : yup.string().required('required'),
    descriptionCategory : yup.string().required('required')
})


const Lambs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [lambId,setLambId] = useState();
    const [openLambForm,setOpenLambForm] = useState(false)
    const [openMsg,setOpenMsg] = useState(false);
    const [typeMsg,setTypeMsg] = useState("");
    const [msgText,setMsgText] = useState("");
    const [openQst,setOpenQst] = useState(false);
    const [allLambs,setAllLambs] = useState([]);


    const [categories,setAllCategories] = useState([]);
    const [breeds,setAllBreeds] = useState([]);

    const [value, setValue] = useState('one');
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };


    //  BRING ALL CATEGORIES
    useEffect(()=>{
        getAllLambs();
        
    },[]);

    //GET ALL  STAGES FROM DATABASE 
    const  getAllLambs = async()=>{
        const res = await fetch('http://localhost:4000/ovinos/');
        const datos = await res.json();
        setAllLambs(datos);  
    }

    const columns = [
        {
            field: "id", headerName: "Id Lamb"
        },
        {
            field: "nombre_raza", headerName: "Lamb Breed"
        },
        {
            field: "nombre_categoria", headerName: "Lamb Category",width: 150
        },
        {
            field: "nombre_bien", headerName: "Lamb Name", width: 150
        },
        {
            field: "tipo", headerName: "Lamb Type"
        },
        {
            field: "codigo", headerName: "Lamb Code"
        },
        
        {
            field: "edit",
            headerName: " ",
            width: 20,
            renderCell: (rowSelected) => (
                
              <IconButton onClick={() => (
                //handleUpdateCategory(rowSelected.id)
                alert('Updating lamb')
                
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
                
                 //handleQuestion(param.id)
                 alert('Deleting lamb')
                 
               
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
        setLambId(id);
    }

    const handleNewLamb = () => {
        setLambId(null);
        getAllCategories();
        getAllBreeds();
        // initialValues.nameCategory = null;
        // initialValues.descriptionCategory = null;
        setOpenLambForm(true);
    };

    //Get All Categories
    const getAllCategories = async () => {
        const data = await fetch('http://localhost:4000/categorias/');
        const res = await data.json();
        setAllCategories(res);
    }

    //Get All Breeds
    const getAllBreeds = async () => {
        const data = await fetch('http://localhost:4000/razas/');
        const res = await data.json();
        setAllBreeds(res);
    }

    const handleUpdateLamb = async (id) => {
        
        const response = await fetch(`http://localhost:4000/ovinos/${id}`,{
            method: 'GET'
        });
        const data = await response.json();
        console.log(data)
        // initialValues.nameCategory = data[0].nombre_categoria;
        // initialValues.descriptionCategory =  data[0].descripcion;
        setLambId(id);
        setOpenLambForm(true);
    };

    const handleDeleteLamb = async () => {

        try {
            await fetch(`http://localhost:4000/ovinos/${lambId}`,{
            method:'DELETE'
          })
        setMsgText('Lamb deleted successfully!!!');
        setTypeMsg('success');
        setOpenMsg(true);
        getAllLambs();
          
          
          } catch (error) {
            setMsgText('Error on deleting lamb!!!');
            setTypeMsg('errors');
            setOpenMsg(true);
            getAllLambs();
            
          } 
          setOpenQst(false);
    };

    const handleSubmitLamb = async (values) => {
      //alert(JSON.stringify(values, null, 2));
      //alert(stageId) 
      if(lambId)
       {
          
        try {
                await fetch(
                    `http://localhost:4000/ovinos/${lambId}` ,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(values, null, 2),
                    }
                );
            setMsgText('Lamb updated successfully!!!');
            setTypeMsg('success');
            setOpenMsg(true);
            getAllLambs();
        } 
        catch (error) {
            setMsgText(`Error on updating lamb ${error}`);
            setTypeMsg('error');
            setOpenMsg(true);
            
        }
       }else
       {
            try {
            await fetch('http://localhost:4000/ovinos/',{
                method: "POST", 
                body: JSON.stringify(values, null, 2), 
                headers: { "Content-Type": "application/json" },
                });

                setMsgText('Lamb created successfully!!!');
                setTypeMsg('success');
                setOpenMsg(true);
                getAllLambs();
            
        } catch (error) {
            setMsgText(`Error on creating new lamb ${error}`);
            setTypeMsg('error');
            setOpenMsg(true);
        }
       }
       setOpenLambForm(false);
    }

    const handleCloseMsg = () => {
        setOpenMsg(false);
    }
     


return (
<>
    <Box m='5px'>
        <Box display="flex" p={2} m='1px'>
            <Box display="flex">
                <Header title="Lambs" subtitle="Manage Lambs"/>
            </Box>
            <Box display="flex" m={"10px"} sx={{backgroundColor:'transparent',alignContent:'baseline'}}>
                <Button variant="outlined" sx={{
                    backgroundColor: colors.greenAccent[600],
                    "&:hover": {background: colors.blueAccent[700], color:colors.greenAccent[100]},
                    "height": "40px"
                    }
                    }
                    startIcon = {<AddOutlined />}
                  
                    onClick={handleNewLamb}
                    
                >
                    New Purchase Lamb 
                </Button>
                <Button variant="outlined" sx={{
                    backgroundColor: colors.greenAccent[600],
                    "&:hover": {background: colors.blueAccent[700], color:colors.greenAccent[100]},
                    "height": "40px"
                    }
                    }
                    startIcon = {<AddOutlined />}
                  
                    //onClick={handleNewActivity}
                    
                >
                    New Birth Lamb 
                </Button>
            </Box>

        </Box>
        <Box
           
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
                        rows={allLambs}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                          }}
                          pageSizeOptions={[5, 10, 25]}
                    />
                       
    
                    {/* </DataGrid> */}
                </Box>


        </Box>

    </Box>
    {/* <Dialog >  */}
                            
        {/* <Formik
            onSubmit={handleSubmitLamb}
            validationSchema={categoryScheme}
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
                            
                            {categoryId ? "Edit Categroy":"Create New Category"}
                        </Typography>
                    </Box>
                    <Box sx={{background: colors.primary[400]}}>
                        <TextField 
                            fullWidth
                            variant="filled"
                            type="text"
                            label= "Name Category"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.nameCategory}
                            name="nameCategory"
                            error = {!!touched.nameCategory && !!errors.nameCategory}    
                            helperText = {touched.nameCategory && errors.nameCategory}  
                        />
                        <TextField 
                            fullWidth
                            variant="filled"
                            type="text"
                            label= "Description Category"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.descriptionCategory}
                            name="descriptionCategory"
                            error = {!!touched.descriptionCategory && !!errors.descriptionCategory}    
                            helperText = {touched.descriptionCategory && errors.descriptionCategory}  
                        
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
                            {categoryId ? 'Save': 'Create' }
                        </Button>
                        <Button
                            variant="contained"
                            sx={{"height": "30px",
                            marginRight:'10px',
                            marginTop:'2px'    }}
                            onClick={()=>setOpenCategoryForm(false)} 
                        >
                            Close
                        </Button>
                    </Box>

                </form>

            )}
        </Formik> */}
    {/* </Dialog>                       */}




    <Dialog open={openLambForm} maxWidth='lg' >
        {/* <Box>
            <RadioGroup >
                <FormControlLabel value= "1" control={<Radio />} Label='Purchase' />                
                <FormControlLabel value="2" control={<Radio />} Label='Birth' />                                  
            </RadioGroup>
            <Button onClick={()=>setOpenLambForm(false)}>
                Cerrar
            </Button>  

        </Box> */}
        
        <Formik
            onSubmit={handleSubmitLamb}
            validationSchema={lambPurchaseScheme}
            initialValues={initialValuesPurchase}
            
        >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit })=> (
              
              <Box 
                display="grid" 
                gap="10px" 
                gridTemplateColumns="repeat(10,minmax(0, 1fr))"
                width='100%'
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined: "span 10"},
                    backgroundColor:colors.blueAccent[700],
                   
                }}
                padding='10px'
             >
                <Typography
                    sx={{
                        gridColumn: "span 10",
                        backgroundColor: colors.primary[500]
                    }}
                >
                        New Purchase Lamb
                </Typography>
                   
                <TextField 
                            fullWidth
                            variant="filled"
                            type="text"
                            label= "Code Lamb"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.codeLamb}
                            name="codeLamb"
                            error = {!!touched.codeLamb && !!errors.codeLamb}    
                            helperText = {touched.codeLamb && errors.codeLamb}  
                            sx={{
                                gridColumn: "span 2"
                                
                            }}
                        />
                <Select 
                    label = 'Choose Category'
                    labelId="idBreed"        
                    name="idBreed"
                    value={values.idBreed}
                    onChange={handleChange}
                    sx={{
                        gridColumn: "span 2",
                        
                        maxHeight:'55px'
                    }}
                    
                >
                    {
                            // (categories.length > 0 ? alert('Si hay'):alert('No hay'))
                            breeds.map((bre)=>{
                                //console.log(bre.nombre_raza)
                                return(
                                    <MenuItem key ={bre.id} value={bre.id}> 
                                        {bre.nombre_raza}
                                    </MenuItem>
                                    )
                                }
                            )
                        }    

                </Select>
                
                <Select
                            label = 'Choose Category'
                            
                            name="id"
                            value={values.id}
                            onChange={handleChange}
                            sx={{
                                gridColumn: "span 2",
                                
                                maxHeight:'55px'
                            }}
                        >
                        {
                            // (categories.length > 0 ? alert('Si hay'):alert('No hay'))
                            categories.map((cat)=>{
                                
                                return(
                                    <MenuItem key ={cat.id} value={cat.id}> 
                                        {cat.nombre_categoria}
                                    </MenuItem>
                                    )
                                 }
                            )
                        }    
    
                        </Select>
                    <Select
                          label = 'Lamb Sex'
                          defaultValue={1}
                          placeholder="Choose Lamb sex"
                          value={values.sexLamb}
                          onChange={handleChange}
                          name="sexLamb"
                          sx={{
                            gridColumn: "span 1",
                            
                            maxHeight:'55px'
                        }}
                    >
                    <MenuItem value ={1}>Male</MenuItem>
                    <MenuItem value = {2}>Female</MenuItem>
                    </Select> 
                    <TextField 
                            fullWidth
                            variant="filled"
                            type="text"
                            label= "Name Lamb"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.nameLamb}
                            name="nameLamb"
                            error = {!!touched.nameLamb && !!errors.nameLamb}    
                            helperText = {touched.nameLamb && errors.nameLamb}  
                            sx={{
                                gridColumn: "span 3"
                                
                            }}
                            
                        />
                        <TextField 
                            fullWidth
                            variant="filled"
                            type="text"
                            label= "Weight Lamb"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.weightLamb}
                            name="weightLamb"
                            error = {!!touched.weightLamb && !!errors.weightLamb}    
                            helperText = {touched.weightLamb && errors.weightLamb}  
                            sx={{
                                gridColumn: "span 1"
                                
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position='start' >Kg.</InputAdornment>                                                                                                              
                              }}
                        />
                        <TextField 
                            fullWidth
                            variant="filled"
                            type="text"
                            label= "Age Lamb"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.ageLamb}
                            name="ageLamb"
                            error = {!!touched.ageLamb && !!errors.ageLamb}    
                            helperText = {touched.ageLamb && errors.ageLamb}  
                            sx={{
                                gridColumn: "span 1"
                               
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position='start' >Days</InputAdornment>                                                                                                              
                              }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type='date'
                          label ='Date Purchase'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value = {values.datePurchase.substring(0,10)}
                          name = 'datePurchase'
                          error = {!!touched.datePurchase && !!errors.datePurchase}    
                          helperText = {touched.datePurchase && errors.datePurchase}
                          sx={{ gridColumn: "span 2"
                          }}                       
                        />
                        <TextField 
                            fullWidth
                            variant="filled"
                            type="text"
                            label= "Price Lamb"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.priceLamb}
                            name="priceLamb"
                            error = {!!touched.priceLamb && !!errors.priceLamb}    
                            helperText = {touched.priceLamb && errors.priceLamb}  
                            sx={{
                                gridColumn: "span 1"
                               
                            }}
                            InputProps={{
                                startAdornment: <InputAdornment position='start' >$</InputAdornment>                                                                                                              
                              }}
                        />
                        <TextField 
                            fullWidth
                            variant="filled"
                            type="text"
                            label= "Provinience Place"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.provenienceLamb}
                            name="provenienceLamb"
                            error = {!!touched.provenienceLamb && !!errors.provenienceLamb}    
                            helperText = {touched.provenienceLamb && errors.provenienceLamb}  
                            sx={{
                                gridColumn: "span 5"
                               
                            }}
                        />
                        <TextField 
                            fullWidth
                            variant="filled"
                            type="text"
                            label= "Comments Lamb"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.commentsLamb}
                            name="commentsLamb"
                            error = {!!touched.commentsLamb && !!errors.commentsLamb}    
                            helperText = {touched.commentsLamb && errors.commentsLamb}  
                            sx={{
                                gridColumn: "span 10"
                               
                            }}
                            multiline
                            rows={2}
                            
                        />

                        <Button 
                            variant='contained'
                            onClick={()=>setOpenLambForm(false)}
                            sx={{
                                gridColumn: "span 5"
                                
                            }}
                             >
                        Save    
                        </Button> 

                        <Button 
                            variant='contained'
                            onClick={()=>setOpenLambForm(false)}
                            sx={{
                                gridColumn: "span 5"
                                
                            }}
                             >
                        Cerrar    
                        </Button> 
                </Box> 

                
    
            )}

            
        



      
      
      
    
    </Formik>

    </Dialog>
</>

)    

}

export default Lambs;



            