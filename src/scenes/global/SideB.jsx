import { useState } from "react";
import { Sidebar, Menu, MenuItem, SidebarContext, SubMenu, sidebarClasses,SidebarHeader, menuClasses, MenuItemFR, MenuContext } from "react-pro-sidebar";
//import 'react-pro-sidebar/dist/scss/styles.scss';
//import 'react-pro-sidebar/dist/utils/utilityClasses';
import { Box, IconButton,Typography, createTheme, menuItemClasses, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AssessmentIcon from '@mui/icons-material/Assessment';
import DeblurIcon from '@mui/icons-material/Deblur';

import { CalendarTodayOutlined, ListAltOutlined, PetsOutlined, SettingsOutlined } from "@mui/icons-material";



const Item = ({title,to,icon,selected,setSelected})=> {
    const theme = createTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem 
            active={selected === title} 
            style={{color: colors.grey[800]}}
            onClick={()=>setSelected(title)}
            icon = {icon}
            component={<Link to={to} />}
            
            rootStyles={{
                [`.${menuClasses.active}`]: {
                    color: "#6870fa",backgroundColor:"transparent"
                 
                  },
                
               
              }
            }
            



        >
            <Typography>
                {title}
            </Typography>
           
                   
        </MenuItem>
    )
}




const SideB = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode); 
    const [isCollapsed,setIsCollapsed] = useState(false);
    const [selected,setSelected] = useState('Dashboard');
    return (
        <Box
            sx={{background:`${colors.primary[400]}`,     
                "&:pro-sidebar-inner":{
                    background:`${colors.primary[400]} !important`,
                },
                "&:pro-icon-wrapper":{
                    backgroundColor: "transparent",
                },
                "&:pro-icon-item":{
                    padding: "5px 35px 5px 20px",
                },
                "&:pro-inner-item: hover":{
                    color: "#868dfb",
                },
                "&:pro-menu-item.active":{
                    color: "#6870fa",
                },
            }} 
             
        >
        <Sidebar collapsed={isCollapsed} 
        
            rootStyles={{
                [`.${sidebarClasses.container}`]: {
                  backgroundColor:'transparent'
                 
                  }}
               
              }
              
        >
        
                <Menu iconShape = 'square'
                    menuItemStyles={{
                        button: ({ level }) => {
                          // only apply styles on first level elements of the tree
                          if (level === 1 || level=== 0)
                            return {
                                '&:hover': {
                              backgroundColor: 'transparent'
                              
                            }
                              
                              
                            };
                        }
                      }
                      
                    }              
                              




                >
                    {/* LOGO AND MENU ICON */}
                    
                    <MenuItem
                        onClick={()=> setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon/>: undefined}
                        style={{
                            margin: "5px 0 10px 0px",
                            color: colors.grey[500]
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="1px"
                                p={2}
                            >
                                <Box display="flex">
                                    <Typography variant="h3" color={colors.grey[500]} sx={{ml:1,flex: 1}}>
                                        ADMINIS
                                    </Typography>
                                </Box>
                                <Box display="flex">
                                <IconButton onClick={()=>setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                                </Box>
                            </Box>
                        )}                       
                    </MenuItem>

               
                {/* { USER } */}
                    {/* { !isCollapsed && (
                        <Box  >
                            <Box display="flex" justifyContent="center" alignItems="center" >
                                <img 
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/user.jpeg`}
                                    style = {{cursor: 'pointer',borderRadius: "50%"}}
                                    
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h2" color ={colors.grey[100]} fontWeight="600" sx={{m:"1px 0 0 0"}}>Ed Roh</Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>VP Fancy Admin</Typography>
                            </Box>
                        </Box>

                        )}   */}
                        {/* { MENU ITEMS}      */}
                      
                        
                        <Box paddingLeft={isCollapsed ? undefined: "10%"}>
                        <Typography 
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{m: "15px 0 5px 20px" }}
                            >
                                Settings
                            </Typography>
                        <SubMenu label="Settings"
                            rootStyles={{
                                [`.${menuClasses.subMenuContent}`]: {
                                  backgroundColor: colors.primary[500],
                                  isolation: 'auto'
                                  }
                               }
                            }
                            icon={<SettingsOutlined />}

                               
                        >
                        <Item
                                title='Stages'
                                to="/stages"
                                icon={<ListAltOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />

                            <Item
                                title='Categories'
                                to="/categories"
                                icon={<ListAltOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />

                            <Item
                                title='Breeds'
                                to="/breeds"
                                icon={<ListAltOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />

                            <Item
                                title='Activities'
                                to="/activities"
                                icon={<MapOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />

                            <Item
                                title='Lambs'
                                to="/lambs"
                                icon={<DeblurIcon/>}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />
                        </SubMenu>
                        <Typography 
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{m: "15px 0 5px 20px" }}
                        >
                            Takens
                        </Typography>
                        <SubMenu label="Takens"
                            rootStyles={{
                                [`.${menuClasses.subMenuContent}`]: {
                                  backgroundColor: colors.primary[500],
                                  isolation: 'auto'
                                  }
                               }
                            }
                            icon={<AssessmentIcon />}
                        >
                            
                        
                        </SubMenu>    
                            
                            
                            
                            
                            
                            
                            
                            
                            
                            <Item
                                title='Dashboard'
                                to="/"
                                icon={<HomeOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />
                            <Typography 
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{m: "15px 0 5px 20px" }}
                            >
                                Data
                            </Typography>
                            <Item
                                title='Manage Team'
                                to="/team"
                                icon={<PeopleOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />

                            <Item
                                title='Contact'
                                to="/contacts"
                                icon={<ContactsOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />

                            <Item
                                title='Invoices Balances'
                                to="/invoices"
                                icon={<ReceiptOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />
                             <Typography 
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{m: "15px 0 5px 20px" }}
                            >
                                Pages
                            </Typography>

                            <Item
                                title='Profile Form'
                                to="/form"
                                icon={<PersonOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />

                            <Item
                                title='Calendar'
                                to="/calendar"
                                icon={<CalendarTodayOutlined />}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />

                            <Item
                                title='FAQ Page'
                                to="/faq"
                                icon={<HelpOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />
                             <Typography 
                                variant="h6"
                                color={colors.grey[300]}
                                sx={{m: "15px 0 5px 20px" }}
                            >
                                Charts
                            </Typography>

                            <Item
                                title='Bar Chart'
                                to="/bar"
                                icon={<BarChartOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />

                            <Item
                                title='Pie Chart'
                                to="/pie"
                                icon={<PieChartOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />

                            <Item
                                title='Line Chart'
                                to="/line"
                                icon={<TimelineOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />

                            <Item
                                title='Geography Chart'
                                to="/geography"
                                icon={<MapOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            
                            />
                        </Box>
                        




                    </Menu>
               

            </Sidebar> 


           

            

        </Box>
    )

}

export default SideB;