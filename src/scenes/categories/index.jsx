import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from '../../theme';
import Header from "../../compoments/Header";
import { useEffect,useState } from "react";
import { AddOutlined, DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from  "yup";




const initialValues = {
    nameCategory: "",
    descriptionCategory: "",
};

const categoryScheme = yup.object().shape({
    nameCategory : yup.string().required('required'),
    descriptionCategory : yup.string().required('required')
})

const Categories = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [categoryId,setCategoryId] = useState();
    const [openCategoryForm,setOpenCategoryForm] = useState(false)
    const [openMsg,setOpenMsg] = useState(false);
    const [typeMsg,setTypeMsg] = useState("");
    const [msgText,setMsgText] = useState("");
    const [openQst,setOpenQst] = useState(false);
    const [allCategories,setAllCategories] = useState([]);

    //  BRING ALL CATEGORIES
    useEffect(()=>{
        getAllCategories();
        
    },[]);

    //GET ALL  STAGES FROM DATABASE 
    const  getAllCategories = async()=>{
        const res = await fetch('http://localhost:4000/categorias/');
        const datos = await res.json();
        setAllCategories(datos);  
    }

    const columns = [
        {
            field: "id", headerName: "Id Category"
        },
        {
            field: "nombre_categoria", headerName: "Category Name"
        },
        
        {
            field: "edit",
            headerName: " ",
            width: 20,
            renderCell: (rowSelected) => (
                
              <IconButton onClick={() => (
                handleUpdateCategory(rowSelected.id)
                
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
        setCategoryId(id);
    }

    const handleNewCategory = () => {
        setCategoryId(null);
        initialValues.nameCategory = null;
        initialValues.descriptionCategory = null;
        setOpenCategoryForm(true);
    };

    const handleUpdateCategory = async (id) => {
        
        const response = await fetch(`http://localhost:4000/categorias/${id}`,{
            method: 'GET'
        });
        const data = await response.json();
        console.log(data)
        initialValues.nameCategory = data[0].nombre_categoria;
        initialValues.descriptionCategory =  data[0].descripcion;
        setCategoryId(id);
        setOpenCategoryForm(true);
    };

    const handleDeleteCategory = async () => {

        try {
            await fetch(`http://localhost:4000/categorias/${categoryId}`,{
            method:'DELETE'
          })
        setMsgText('Category deleted successfully!!!');
        setTypeMsg('success');
        setOpenMsg(true);
        getAllCategories();
          
          
          } catch (error) {
            setMsgText('Error on deleting category!!!');
            setTypeMsg('errors');
            setOpenMsg(true);
            getAllCategories();
            
          } 
          setOpenQst(false);
    };

    const handleSubmitCategory = async (values) => {
      //alert(JSON.stringify(values, null, 2));
      //alert(stageId) 
      if(categoryId)
       {
          
        try {
                await fetch(
                    `http://localhost:4000/categorias/${categoryId}` ,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(values, null, 2),
                    }
                );
            setMsgText('Category updated successfully!!!');
            setTypeMsg('success');
            setOpenMsg(true);
            getAllCategories();
        } 
        catch (error) {
            setMsgText(`Error on updating category ${error}`);
            setTypeMsg('error');
            setOpenMsg(true);
            
        }
       }else
       {
            try {
            await fetch('http://localhost:4000/categorias/',{
                method: "POST", 
                body: JSON.stringify(values, null, 2), 
                headers: { "Content-Type": "application/json" },
                });

                setMsgText('Category created successfully!!!');
                setTypeMsg('success');
                setOpenMsg(true);
                getAllCategories();
            
        } catch (error) {
            setMsgText(`Error on creating new category ${error}`);
            setTypeMsg('error');
            setOpenMsg(true);
        }
       }
       setOpenCategoryForm(false);
    }

    const handleCloseMsg = () => {
        setOpenMsg(false);
    }
     




return(
    <>
    <Box m="5px">
        <Box display="flex" p={2} m='1px'>
            <Box display="flex">
                <Header title='Categories' subtitle='Manage categories' />  
            </Box>
            <Box display="flex" m={"10px"} sx={{backgroundColor:'transparent',alignContent:'baseline'}}>
                <Button variant="outlined" sx={{
                    backgroundColor: colors.greenAccent[600],
                    "&:hover": {background: colors.blueAccent[700], color:colors.greenAccent[100]},
                    "height": "40px"
                    }
                    }
                    startIcon = {<AddOutlined  />}
                    onClick={handleNewCategory}
                    
                >
                    New Category
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
                        rows={allCategories}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                          }}
                          pageSizeOptions={[5, 10, 25]}
                    />
                       
    
                    {/* </DataGrid> */}
                </Box>
        </Box>
        
    </Box>
    <Dialog open= {openCategoryForm}>
        <Formik
            onSubmit={handleSubmitCategory}
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
                Delete category
            </Typography>
        </DialogTitle> 
        <DialogContent 
            sx={{background:colors.primary[500],
                alignContent: 'baseline',
                textAlign: 'left'
            }}
            
        >
            <Typography>
                Desea eliminar la categoría?
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
                onClick={handleDeleteCategory}
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

export default Categories;