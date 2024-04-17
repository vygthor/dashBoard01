import { Box } from "@mui/material";
import Header from "../../compoments/Header";
import GeographyChart from "../../compoments/GeographyChart";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";


const Geography = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
return(
    <Box m="20px">
        <Header title="Geography Chart" subtitle="Simple Geography Chart" />
        <Box height="75vh" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
                <GeographyChart />
        </Box>
    </Box>
)
}

export default Geography;