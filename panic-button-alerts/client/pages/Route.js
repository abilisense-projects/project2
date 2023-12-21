import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import HomeScreen from "./Homepage";
import RegisterScreen from "./RegistrScreen";
import LoginScreen from "./LogIn";

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "home" component = {HomeScreen} title = "Home" initial = {true} />
         <Scene key = "Register" component = {RegisterScreen} title = "Register" />
      </Scene>
   </Router>
)
export default Routes