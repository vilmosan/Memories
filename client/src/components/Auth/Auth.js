import React, {useState} from 'react';
import useStyles from './styles';
import {Avatar, Button, Container, Grid, Paper, Typography} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import {GoogleLogin} from 'react-google-login';
import Icon from './icon';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import dotenv from "dotenv";

const Auth = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignup] = useState(false);

	dotenv.config();
	const handleSubmit = () => {

	};

	const handleChange = () => {

	};

	const switchMode = () => {
		setIsSignup((prevIsSignUp) => !prevIsSignUp);
		handleShowPassword(false);
	};

	const handleShowPassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword)
	};

	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({type: 'AUTH', data: {result, token}})
			history.push('/');
		} catch (error) {
			console.log(error)
		}
	}

	const googleFailure = (error) => {
		console.log("Google Sign in was unsuccessful. Try again later.")
		console.log(error);
	}

	return (

		<Container component={"main"} maxWidth={"xs"}>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography variant={"h5"}>{isSignup ? 'Register' : 'Sign in'}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{
							isSignup && (
								<>
									<Input name={"firstName"} label={"First name:"} handleChange={handleChange}
										   autoFocus half/>
									<Input name={"lastName"} label={"Last name:"} handleChange={handleChange} half/>
								</>
							)
						}
						<Input name={"email"} label={"Email address:"} handleChange={handleChange} type={"email"}/>
						<Input name={"password"} label={"Password:"} handleChange={handleChange}
							   type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
						{isSignup &&
						<Input name={"confirmPassword"} label={"Repeat password:"} handleChange={handleChange}
							   type={"password"}/>
						}
					</Grid>
					<Button type={"submit"} fullWidth variant={"contained"} color={"primary"}
							className={classes.submit}>
						{isSignup ? "Register" : "Sign in"}
					</Button>
					<GoogleLogin
						clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} // https://console.cloud.google.com
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color={"primary"}
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								variant={"contained"}
								startIcon={<Icon/>}>
								Google Sign-in
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy={"single_host_origin"}
					/>
					<Grid container justifyContent={"flex-end"}>
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup ? "Already have an account? Sign in!" : "Don't have an account? Sign up!"}
							</Button>
						</Grid>
					</Grid>
				</form>

			</Paper>
		</Container>

	);
};

export default Auth;
