import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Theme, Button, Container, Slide, FormControl, InputLabel, Input, FormHelperText, Box } from "@material-ui/core";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";
import { login } from "../../utils/auth"; 
import { GlobalContext } from "../../utils/contexts";
import Cover from "./Cover";

const styles = (theme: Theme) => ({
  mainContainer: {
    marginTop: theme.spacing(15)
  }, loginContainer: {
    padding: theme.spacing(4)
  }, title: {
    color: theme.palette.primary.dark
  }, subTitle: {
    color: theme.palette.primary.main
  }
});

interface LoginPropsI {
  classes: Classes;
  theme: Theme;
}
interface LoginStateI {
  inputs: any;
  validation: any;
}

class Login extends Component<LoginPropsI, LoginStateI> {
  static contextType = GlobalContext;
  
  constructor(props: LoginPropsI) {
    super(props);
    this.state = {
      inputs: {},
      validation: {
        password: {}
      }
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    var updatedInputs = this.state.inputs;
    updatedInputs[event.target.name] = event.target.value;
    this.setState(updatedInputs);
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.context.toggleLoader(true);
    login(this.state.inputs, (res: any, authed: boolean) => {
      this.setState({
        validation: res.data
      });
      this.context.toggleLoader(false);
      if(!authed) return;
      window.location.reload();
    });
  }

  render() {
    const { classes, theme } = this.props;
    const validation = this.state.validation;

    return (
      <Container maxWidth="sm" className={classes.mainContainer}>
        <Cover />
        <Box position="relative" zIndex="tooltip">
          <Slide direction="down" in={true} timeout={500}>
            <Paper className={classes.loginContainer}>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography variant="h4" component="h4" className={classes.title}
                  >Login</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" component="h6" className={classes.subTitle}
                  >Login is required to continue</Typography>
                </Grid>
              </Grid>
              <form name="loginForm" onSubmit={this.handleSubmit} onError={this.handleSubmit}>
                <Grid container direction="column" alignItems="center">
                  <Grid item style={{marginTop: theme.spacing(2)}}>
                    <FormControl
                      error={validation.password.invalid}
                    >
                      <InputLabel>Password</InputLabel>
                      <Input
                        id="password"
                        placeholder="Super secret password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        onChange={this.handleChange}
                        required={true}
                      />
                      <FormHelperText>{validation.password.err}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item style={{marginTop: theme.spacing(2)}}>
                    <Button
                      type="submit"
                      color="primary"
                      size="small"
                      variant="contained"
                      className={classes.button}
                    >Continue</Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Slide>
        </Box>
      </Container>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Login);