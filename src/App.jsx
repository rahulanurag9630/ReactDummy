import React, { Suspense, Fragment } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { routes } from "src/routes";
import { createBrowserHistory } from "history";
import AuthContext from "src/context/Auth";
import PageLoading from "src/component/PageLoading";
import AuthGuard from "./config/AuthGuard";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "src/theme";
import { Toaster } from "react-hot-toast";
 


function App() {
  const theme = createTheme();
  const history = createBrowserHistory(); 


  console.log(theme);
  return (
    <div className="App">



      <ThemeProvider theme={theme}>
     
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AuthContext>
            <Router history={history}>
              <RenderRoutes data={routes} />
            </Router>
          </AuthContext>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

function RenderRoutes(props) {
  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        {props.data.map((route, i) => {
          const Component = route.component;
          const Guard = route.guard ? AuthGuard : Fragment;
          const Layout = route.layout || Fragment;
          return (
            <Route
              exact={route.exact}
              key={i}
              path={route.path}
              render={(props) => (
                <Guard>
                  <Toaster position="top-right" />

                  <Layout>
                    {route.routes ? (
                      <RenderRoutes data={route.routes} />
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}
