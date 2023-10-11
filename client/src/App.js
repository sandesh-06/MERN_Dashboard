// NOTE: THE FOLDER 'COMPONENTS' CONTAINS THE PAGES, THE FOLDER 'ACTUAL COMPONENTS' CONTAINS THE COMPONENTS

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";

import Layout from "components/layout";
import Dashboard from "components/dashboard";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/*It's like a css reset */}

          <Routes>
  
            <Route element={<Layout/>}> 

              <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>

            </Route>
          </Routes>

        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
