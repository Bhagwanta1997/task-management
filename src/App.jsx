import { Box, ThemeProvider } from "@mui/system";
import "./App.css";
import TaskList from "./modules/task-list";

import { createTheme } from '@mui/material/styles';
import Parent from "./modules/parent";

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
      light: '#000',
      dark: '#000',
      contrastText: '#FFF',
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={appStyles.app}>
        <TaskList />
        {/* <Parent/> */}
      </Box>
    </ThemeProvider>
  );
}

const appStyles = {
  app: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 5,
  }
}

export default App;
