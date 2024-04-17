import { Box  } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataContacts } from "../../data/mockData";
import Header from '../../compoments/Header';
import { useTheme } from '@emotion/react';

const Contacts = () =>{
    const theme= useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: "id", headerName: "ID",flex: 0.5
        },
        {
            field: "registrarId", headerName: "Registrar ID",flex: 0.5
        },
        {
            field: 'name', headerName: "Name",flex:1, cellClassName: "name-column--cell",
        },
        {
            field: 'age', headerName: "Age",type: "number", headerAlign: "center",align: "center",
        },
        {
            field: 'phone', headerName: "Phone Number",flex: 1,
        },
        {
            field: 'email', headerName: "Email",flex: 1,
        },
        { 
            field: "address", headerName: "Address",flex: 1
        },
        {
            field: "city", headerName: "City",flex: 1
        },
        {
            field: "zipCode", headerName: "ZipCode",flex: 1
        },
        
    ]

    return (    
        <Box m="20px">
            <Header title={'CONTACTS'} subtitle={"List of contactas for future References"} />
             <Box 
                m="40px 0 0 0"
                height= "75vh"
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
                
                <Box>
                    <DataGrid 
                        rows={mockDataContacts}
                        columns={columns}
                        slots={{toolbar: GridToolbar}}
                    />
                </Box>
                
            </Box>

        </Box>
       
    )
}


export default Contacts;