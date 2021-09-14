import React,{useState} from 'react';
import useStyles from './styles';
import {Avatar, Button, Container, Grid, Typography, Paper} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input'

const Auth = () => {
	const classes = useStyles();
	const [showPassword, setShowPassword] = useState(false);

	const [isSignup, setIsSignup] = useState(false);

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
										<Input name={"firstName"} label={"First name:"} handleChange={handleChange} autoFocus half/>
										<Input name={"lastName"} label={"Last name:"} handleChange={handleChange} half/>
									</>
								)
							}
							<Input name={"email"} label={"Email address:"} handleChange={handleChange} type={"email"}/>
							<Input name={"password"} label={"Password:"} handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
							{ isSignup && <Input name={"confirmPassword"} label={"Repeat password:"} handleChange={handleChange} type={"password"}/>
							}
						</Grid>
						<Button type={"submit"} fullWidth variant={"contained"} color={"primary"} className={classes.submit}>
							{ isSignup ? "Register" : "Sign in" }
						</Button>
						<Grid container justify={"flex-end"}>
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
