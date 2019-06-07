import {
    Button,
    FormControl,
    LinearProgress,  
    Paper,
    TextField as MuiTextField,
    Typography,
    withStyles
} from '@material-ui/core';
import { Field, Form, Formik, FormikActions, FormikProps } from 'formik';
import { fieldToTextField, TextFieldProps } from "formik-material-ui";
import * as React from 'react';
import { withLocalize } from 'react-localize-redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import * as Yup from "yup";
import { signupRequest } from '../../actions/auth/auth';
import { IAppState } from '../../interfaces/application.interface';
import { styles } from './style';

const signupTextField = (prop: TextFieldProps) => <MuiTextField {...fieldToTextField(prop)} />;

interface INavState {
    isLoading: boolean
}

interface ISignupValues {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
}

const SignupInitValues: ISignupValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    username: ''    
};

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email("Insert correct email!")
        .required("Email Address is requied!"),
    firstName: Yup.string()
        .min(2, "Too Short!")
        .max(10, "Too Long!")
        .required("First name is required!"),
    lastName: Yup.string()
        .min(2, "Too Short!")
        .max(10, "Too Long!")
        .required("Last name is required!"),
    password: Yup.string()
        .min(5, "Too Short!")
        .max(15, "Too Long!")
        .required("Password is required!"),
    username: Yup.string()
        .min(5, "Too Short!")
        .max(15, "Too Long!")
        .required("Username is required")    
});

class Signup extends React.Component<INavProps, INavState>{
    constructor(props: INavProps) {
        super(props);
    }

    public render() {
        
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <Paper className={classes.paper} >
                    <Typography variant="h5" align="center" component="h3">
                        Sign up
                    </Typography>
                    <Formik
                        initialValues={SignupInitValues}
                        validationSchema={SignupSchema}
                        onSubmit={(values: ISignupValues, formikActions: FormikActions<ISignupValues>) => {
                        setTimeout(() => {
                            formikActions.setSubmitting(false);
                            // console.log('this is credentials:', values);
                            this.props.signupRequest(values);
                            formikActions.resetForm();
                        }, 500);
                        }}
                        render={({ submitForm, isSubmitting, values, setFieldValue }: FormikProps<ISignupValues>) => (
                        <Form>
                            <FormControl margin="normal" required={true} fullWidth={true}>
                                <Field name="firstName" type="text" label="First Name" component={signupTextField} />
                            </FormControl>
                            <FormControl margin="normal" required={true} fullWidth={true}>
                                <Field name="lastName" type="text" label="Last Name" component={signupTextField} />
                            </FormControl>
                            <FormControl margin="normal" required={true} fullWidth={true}>
                                <Field name="email" type="email" label="Email" component={signupTextField} />
                            </FormControl>
                            <FormControl margin="normal" required={true} fullWidth={true}>
                                <Field name="username" type="text" label="Username" component={signupTextField} />
                            </FormControl>
                            <FormControl margin="normal" required={true} fullWidth={true}>
                                <Field name="password" type="password" label="Password" component={signupTextField} />
                            </FormControl>
                            {/* <FormControl margin="normal" required={true} fullWidth={true}>
                                <Field name="confirm" type="password" label="Confirm" component={signupTextField} />
                            </FormControl> */}

                            {isSubmitting && <LinearProgress />}
                            <div className={classes.actions}>
                                <Button className={classes.button}>
                                    Log in
                                </Button>
                                <Button
                                    color="primary"
                                    disabled={isSubmitting} 
                                    onClick={submitForm}
                                    className={classes.button}>
                                    Sign up
                                </Button>
                            </div>
                        </Form>
                        )}
                    />
                </Paper>
            </div>
        );
    }
}

interface INavProps {
    classes: any,
    signupRequest(values: ISignupValues): void
}

interface IStateProps {
    isLoading: boolean
}

interface IDispatchProps {
    signupRequest(values: ISignupValues): void
}

const mapStateToProps = (state: IAppState) => ({
    isLoading: state.auth.isLoading
});

const mapDispatchToProps = (dispatch: any) => ({
    signupRequest: (values: ISignupValues) => dispatch(signupRequest(values))
});

export default compose(
    withStyles(styles),
    withRouter,
    connect<IStateProps, IDispatchProps>(mapStateToProps, mapDispatchToProps),
    withLocalize
)(Signup);
