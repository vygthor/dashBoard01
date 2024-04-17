import { Box,useTheme,Typography } from "@mui/material";
import Header from "../../compoments/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { tokens } from "../../theme";

const FAQ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return  (
        <Box m="20px">
            <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color = { colors.greenAccent[500]} variant="h5">
                        An important question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, est expedita. Ad nam vel cumque tenetur, quidem rem aliquam architecto illo quae adipisci fugit doloribus praesentium quia, quibusdam esse temporibus.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color = { colors.greenAccent[500]} variant="h5">
                        An important question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, est expedita. Ad nam vel cumque tenetur, quidem rem aliquam architecto illo quae adipisci fugit doloribus praesentium quia, quibusdam esse temporibus.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography color = { colors.greenAccent[500]} variant="h5">
                        An important question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, est expedita. Ad nam vel cumque tenetur, quidem rem aliquam architecto illo quae adipisci fugit doloribus praesentium quia, quibusdam esse temporibus.
                    </Typography>
                </AccordionDetails>
            </Accordion>


        </Box>
    )



}

export default FAQ;