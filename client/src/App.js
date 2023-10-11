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
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); //scroll to the end for explaination of this line

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/*It's like a css reset */}

          <Routes>
            
            {/* The layout has sidebar and navbar which will be visible to all the child routes */}
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

/*This code snippet is using the `useMemo` hook from React to memoize the creation of a MUI (Material-UI) theme based on the current `mode` value. Let's break it down step by step:

1. `const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);`

   - `useMemo` is a hook that helps optimize performance by memoizing the result of a function call. It takes two arguments: a function and a dependency array. It will recompute the memoized value whenever the dependencies (specified in the array) change.

   - `createTheme(themeSettings(mode))` is a function call that generates a MUI theme based on some settings and the current `mode`. It appears that `themeSettings` is a function that returns theme settings based on the provided `mode`.

   - `[mode]` is the dependency array. It specifies that the memoized value (`theme`) should be recalculated whenever the `mode` changes. This ensures that the theme is updated in response to changes in `mode`.

2. Here's what happens in more detail:

   - When the component first renders, `createTheme` is called with the current `mode` value. This generates an initial theme.

   - The generated theme is stored in the `theme` constant.

   - If `mode` changes in subsequent renders (due to some external event or state update), `createTheme` will be called again with the new `mode` value, and a new theme will be generated.

   - However, if `mode` remains the same, the memoized value (`theme`) will not change, and the previously generated theme will be reused.

In summary, this code is efficiently creating and managing a MUI theme based on the `mode` value. If `mode` changes, a new theme will be generated, ensuring that the UI reflects the selected mode. This helps optimize performance by avoiding unnecessary theme recalculations. */