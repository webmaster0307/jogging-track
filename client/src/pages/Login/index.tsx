import {
  Button,
  FormControl,
  Grid,  
  LinearProgress,  
  Paper,
  TextField as MuiTextField
} from "@material-ui/core";
// import { withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
// import compose from 'recompose/compose';
import { loginRequest } from '../../actions/auth/auth';
import { IAppState } from '../../interfaces/application.interface';

import { Field, Form, Formik, FormikActions, FormikProps } from 'formik';
import { fieldToTextField, TextFieldProps } from "formik-material-ui";
import * as Yup from "yup";
// import { styles } from './style';

interface ILoginValues {
  username: string,
  password: string
}

const LoginInitValues: ILoginValues = {
  password: '',
  username: ''
};

const LoginSchema = Yup.object().shape({
  password: Yup.string()
      .min(5, "Too Short!")
      .max(15, "Too Long!")
      .required("Requied!"),
  username: Yup.string()
      .min(5, "Too Short!")
      .max(15, "Too Long!")
      .required("Requied!")    
});

const loginTextField = (prop: TextFieldProps) => <MuiTextField {...fieldToTextField(prop)} />;

const Login = (props: RouteComponentProps<any> & IStateProps & IDispatchProps) => (
  <Grid spacing={8}
    container={true}
    direction="row"
    justify="center"
    alignItems="center">
    <Grid item={true} lg={6} container={true}
      direction="row"
      justify="space-around"
      alignItems="center">
      <Grid item={true} container={true}
        direction="column"
        justify="space-between"
        alignItems="center" alignContent="center" lg={2} xs={12}>
        <div>Login Page</div>
      </Grid>
      <Grid item={true} lg={12} container={true}
      direction="row"
      justify="space-around"
      alignItems="center">
        <Paper>
          <Formik
            initialValues={LoginInitValues}
            validationSchema={LoginSchema}
            onSubmit={(values: ILoginValues, formikActions: FormikActions<ILoginValues>) => {
              setTimeout(() => {
                formikActions.setSubmitting(false);
                console.log('this is credentials:', values);
                props.loginRequest(values);
                formikActions.resetForm();
              }, 500);
            }}
            render={({ submitForm, isSubmitting }: FormikProps<ILoginValues>) => (
              <Form>
                <FormControl margin="normal" required={true} fullWidth={true}>
                  <Field name="username" type="text" label="Username" component={loginTextField} />
                </FormControl>
                <FormControl margin="normal" required={true} fullWidth={true}>
                  <Field name="password" type="password" label="Password" component={loginTextField} />
                </FormControl>

                {isSubmitting && <LinearProgress />}

                <FormControl margin="normal" required={true} fullWidth={true}>
                  <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
                    Log in
                  </Button>
                </FormControl>
              </Form>
            )}
          />
        </Paper>
      </Grid>
    </Grid>
  </Grid>
);

interface IStateProps {
  isError: boolean,
  isLoading: boolean
}

interface IDispatchProps {
  loginRequest: (values: ILoginValues) => void
}

const mapStateToProps = (state: IAppState) => ({ 
  isError: state.auth.isError,
  isLoading: state.auth.isLoading  
});

const mapDispatchToProps = (dispatch: any) => ({
  loginRequest: (values: ILoginValues) => dispatch(loginRequest(values))
});

// export default compose(
//   withStyles(styles),
export default connect<IStateProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(Login);
// )(Login);
