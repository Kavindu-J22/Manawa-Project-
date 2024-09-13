import React, { useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Drawer from "./Drawer";

export default function Nav() {

  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const ITEMS = ["home", "chat-home", "group", "submissions", "Evaluations"];

  const logout = () => {
    if (localStorage.getItem("authToken") && localStorage.getItem("userRole")) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      window.location = "/";
    }
  };

  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  return (
    <BrowserRouter>
      <React.Fragment>
        <AppBar sx={{ background: "#063970" }}>
          <Toolbar>
            <Typography sx={{ fontSize: "1.5rem", paddingRight: "10%" }}>
              SLIIT RESEARCH
            </Typography>
            {isMatch ? (
              <>
                <Drawer />
              </>
            ) : (
              <>
                <Tabs
                  textColor="inherit"
                  value={value}
                  onChange={(e, value) => setValue(value)}
                  indicatorColor="primary"
                >
                  {ITEMS.map((page, index) => (
                    <Tab key={index} label={page} />
                  ))}
                </Tabs>
                <Button
                  href="/EvaluationsHome"
                  sx={{ marginLeft: "1%", marginRight: "4%" }}
                  variant="contained"
                >
                  Evaluations
                </Button>
                <Button
                  href="/chat-home"
                  sx={{ marginLeft: "1%", marginRight: "4%" }}
                  variant="contained"
                >
                  chat
                </Button>

                <Button sx={{ marginLeft: "auto" }} variant="contained">
                  Register
                </Button>
                {!localStorage.getItem("authToken") && (
                  <Button
                    href="/login"
                    sx={{ marginLeft: "1%", marginRight: "4%" }}
                    variant="contained"
                  >
                    Login
                  </Button>
                )}

                {localStorage.getItem("authToken") && (
                  <LogoutIcon
                    style={{ "marginLeft": "10px" }}
                    onClick={() => {
                      logout();
                    }}
                  />
                )}
              </>
            )}
          </Toolbar>
        </AppBar>
      </React.Fragment></BrowserRouter>
  );
}
