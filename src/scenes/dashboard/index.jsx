import { Box } from "@mui/material";
import Header from "../../compoments/Header";

const dashboard = () => {
    return <Box m="20px" > 
                <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Dashboard" subtitle="welcome to your Dashboard" />
                </Box>
        </Box>
}

export default dashboard;