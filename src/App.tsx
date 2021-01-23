import { BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
import React  from 'react'
import {ProvideAuth} from "./use-auth";
import routes from './config/routes'
import AppRoutes from './components/AppRoute';
import Navbar from "./components/Navbar";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {ProvideText} from "./use-text";


function App(): React.ReactElement {
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: "#44c2ca",
                contrastText: '#ffffff'
            }
        }
    });
  return (
      <ThemeProvider theme={theme}>
        <ProvideAuth>
            <ProvideText>
              <Router>
                  <Navbar />
                <Switch>
                  { routes.map((route) => (
                    <AppRoutes
                      key={route.path}
                      path={route.path}
                      component={route.component}
                      isPrivate={route.isPrivate}
                    />
                  ))}
                </Switch>
              </Router>
            </ProvideText>
        </ProvideAuth>
      </ThemeProvider>
  )
}

export default App;
