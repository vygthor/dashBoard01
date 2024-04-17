import { ColorModeContext,useMode } from "./theme";
import { CssBaseline,ThemeProvider } from "@mui/material";
import { Routes, Route}  from 'react-router-dom';
import { TopB }from "./scenes/global/TopB.jsx";
import SideB from "./scenes/global/SideB.jsx";
import Dashboard from "./scenes/dashboard/";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar";
import Stages from "./scenes/stages";
import Categories from "./scenes/categories/index.jsx";
import Breeds from "./scenes/breeds/index.jsx";
import Activities from "./scenes/activities/index.jsx";
import Lambs from "./scenes/lambs/index.jsx";


function App() {
  const [theme,colorMode] = useMode()
  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme = {theme}>
    <CssBaseline />
      <div className="app">
        <SideB />
        <main className="content">
          <TopB />
          <Routes>
            <Route path="/" element = {<Dashboard />} />
            <Route path="/team" element = {<Team />} />
            <Route path="/invoices" element = {<Invoices />} />
            <Route path="/contacts" element = {<Contacts />} />
            <Route path="/form" element = {<Form />} />
            <Route path="/bar" element = {<Bar />} />
            <Route path="/pie" element = {<Pie />} />
            <Route path="/line" element = {<Line />} />
            <Route path="/geography" element = {<Geography />} />
            <Route path="/faq" element = {<FAQ />} />
            <Route path="/calendar" element = {<Calendar />} />
            <Route path="/stages" element = {<Stages />} />
            <Route path="/categories" element = {<Categories />} />
            <Route path="/breeds" element = {<Breeds />} />
            <Route path="/activities" element = {<Activities />} />
            <Route path="/lambs" element = {<Lambs />} />
          </Routes>
          
        </main>
 
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
