import React,{useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { NavigationContainer, getFocusedRouteNameFromRoute,  DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Button } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import OnBoardingScreen from './screens/onBoarding';
import LoginScreen from './screens/Login/LoginScreen';
import LoginTamu from './screens/Login/LoginTamu';
import LoginUMKM from './screens/Login/LoginUMKM';
import SignUpScreen from './screens/Login/SignUp';
import SignUpScreen2 from './screens/Login/SignUp2';
import Verification from './screens/Login/Verification';
import PasswordForgetScreen from './screens/Login/ResetPassword';
import PasswordForget2Screen from './screens/Login/ResetPassword2';

import Dashboard from './screens/MenuTamu/Dashboard';
import FoodScreen from './screens/MenuTamu/Dashboard/FoodScreen';
import FoodItem from './screens/MenuTamu/Dashboard/FoodItem';

import CraftScreen from './screens/MenuTamu/Dashboard/CraftScreen';
import CraftItem from './screens/MenuTamu/Dashboard/CraftItem'

import TravelScreen from './screens/MenuTamu/Dashboard/TravelScreen';
import FirstRoute from './screens/MenuTamu/Activity';

import CovidInformationScreen from './screens/MenuTamu/Dashboard/CovidInformationScreen';
import CovidItem from './screens/MenuTamu/Dashboard/CovidInformationScreen/CovidItem';

import ConsultationScreen from './screens/MenuTamu/Dashboard/ConsultationScreen';
import ConsultationItem from './screens/MenuTamu/Dashboard/ConsultationScreen/ConsultationItem';
import ConsultationAccount from './screens/MenuTamu/Dashboard/ConsultationScreen/ConsultationCategories/ConsultationAccount';
import ConsultationProduct from './screens/MenuTamu/Dashboard/ConsultationScreen/ConsultationCategories/ConsultationProduct';
import ConsultationSecurity from './screens/MenuTamu/Dashboard/ConsultationScreen/ConsultationCategories/ConsultationSecurity';
import ConsultationBussines from './screens/MenuTamu/Dashboard/ConsultationScreen/ConsultationCategories/ConsultationBussines';

import MessageScreen from './screens/MenuTamu/MessageScreen';
import MessageItem from './screens/MenuTamu/MessageItem';

import ActivityScreen from './screens/MenuTamu/Activity';
import ActivityDetail from './screens/MenuTamu/Activity/ActivityDetail';

import TrollyScreen from './screens/MenuTamu/Trolly';
import Checkout from './screens/MenuTamu/Trolly/Checkout';

import AccountScreen from './screens/MenuTamu/Account';
import SettingAccount from './screens/MenuTamu/Account/SettingAccount';
import InformationAccount from './screens/MenuTamu/Account/SettingAccount/InformationAccount';
import TermsConditions from './screens/MenuTamu/Account/SettingAccount/Other/TermsConditions';
import PolicyPrivacy from './screens/MenuTamu/Account/SettingAccount/Other/PolicyPrivacy';
import AboutApplication from './screens/MenuTamu/Account/SettingAccount/Other/AboutApplication';

import ChangePassword from './screens/MenuTamu/Account/SettingAccount/ChangePassword';

// Admin
import DashboardAdmin from './screens/MenuUMKM/Dashboard';
import ActivityAdmin from './screens/MenuUMKM/Activity';
import ActivityAdminDetail from './screens/MenuUMKM/Activity/ActivityDetail';
import InformationAdmin from './screens/MenuUMKM/Information';
import AccountAdmin from './screens/MenuUMKM/Account';

import AddProductScreen from './screens/MenuUMKM/Dashboard/AddProduct'
import ProductItem from './screens/MenuUMKM/Dashboard/ProductItem'
import Item from './screens/MenuUMKM/Dashboard/Item'
import ShowProduct from './screens/MenuUMKM/Dashboard/ShowProduct'

import Order from './screens/MenuUMKM/Dashboard/Order'
import Message from './screens/MenuUMKM/Information/Message'

import AdminSettingAccount from './screens/MenuUMKM/Account/SettingAccount';
import AdminInformationAccount from './screens/MenuUMKM/Account/SettingAccount/InformationAccount';
import AdminTermsConditions from './screens/MenuUMKM/Account/SettingAccount/Other/TermsConditions';
import AdminPolicyPrivacy from './screens/MenuUMKM/Account/SettingAccount/Other/PolicyPrivacy';
import AdminAboutApplication from './screens/MenuUMKM/Account/SettingAccount/Other/AboutApplication';

import AdminChangePassword from './screens/MenuUMKM/Account/SettingAccount/ChangePassword';

import ShopStatus from './screens/MenuUMKM/Account/ShopStatus';

const Tab = createBottomTabNavigator();
const TabDashboard = createStackNavigator();
const DashboardNavigator = createBottomTabNavigator();

const TabDashboardAdmin = createStackNavigator();

const AdminTabNavigator =({navigation, SignOut })=>{
  return(
  <TabDashboardAdmin.Navigator headerMode="none">

   <TabDashboardAdmin.Screen
      name="HomeAdminTabs"
      component={HomeAdminTabs}
    />
   <TabDashboardAdmin.Screen
      name="AddProductScreen"
      component={AddProductScreen}
    />
   <TabDashboardAdmin.Screen
      name="ProductItem"
      component={ProductItem}
    />
   <TabDashboardAdmin.Screen
      name="Item"
      component={Item}
    />
   <TabDashboardAdmin.Screen
      name="ShowProduct"
      component={ShowProduct}
    />
   <TabDashboardAdmin.Screen
      name="Order"
      component={Order}
    />
   <TabDashboardAdmin.Screen
      name="Message"
      component={Message}
    />
    
    <TabDashboardAdmin.Screen
      name="AdminSettingAccount"
      component={AdminSettingAccount}
    />
    <TabDashboardAdmin.Screen
      name="AdminInformationAccount"
      component={AdminInformationAccount}
    />

    <TabDashboardAdmin.Screen
      name="AdminPolicyPrivacy"
      component={AdminPolicyPrivacy}
    />

    <TabDashboardAdmin.Screen
      name="AdminAboutApplication"
      component={AdminAboutApplication}
    />

    <TabDashboardAdmin.Screen
      name="AdminTermsConditions"
      component={AdminTermsConditions}
    />

    <TabDashboardAdmin.Screen
      name="AdminChangePassword"
      component={AdminChangePassword}
    />
    <TabDashboardAdmin.Screen
      name="ShopStatus"
      component={ShopStatus}
    />
    <TabDashboardAdmin.Screen
      name="ActivityAdminDetail"
      component={ActivityAdminDetail}
    />

  </TabDashboardAdmin.Navigator>

  )

}

const BottomTabNavigator =({navigation, SignOut })=>{
  // const [signOut, setSignOut] = useState(false)
  const handleSignOut=()=>{
    // setSignOut(true);
    // <App SignOut={true} />
    

    // console.log(signOut);
  }
  return(
    <TabDashboard.Navigator headerMode="none">
       <TabDashboard.Screen
          name="HomeTabs"
          component={HomeTabs}
          />
       {/* <TabDashboard.Screen
          name="Dashboard"
          component={Dashboard}
          /> */}
       <TabDashboard.Screen
          name="FoodScreen"
          component={FoodScreen}
        />
       <TabDashboard.Screen
          name="FoodItem"
          component={FoodItem}
        />

        <TabDashboard.Screen
          name="CraftScreen"
          component={CraftScreen}
        />
          <TabDashboard.Screen
             name="CraftItem"
             component={CraftItem}
           />
           
        <TabDashboard.Screen
          name="TravelScreen"
          component={TravelScreen}
        />
        <TabDashboard.Screen
          name="CovidInformationScreen"
          component={CovidInformationScreen}
        />
        <TabDashboard.Screen
          name="CovidItem"
          component={CovidItem}
        />

        <TabDashboard.Screen
          name="ConsultationScreen"
          component={ConsultationScreen}
        />
        <TabDashboard.Screen
          name="ConsultationItem"
          component={ConsultationItem}
        />
        <TabDashboard.Screen
          name="ConsultationAccount"
          component={ConsultationAccount}
        />
        <TabDashboard.Screen
          name="ConsultationProduct"
          component={ConsultationProduct}
        />
        <TabDashboard.Screen
          name="ConsultationSecurity"
          component={ConsultationSecurity}
        />
        <TabDashboard.Screen
          name="ConsultationBussines"
          component={ConsultationBussines}
        />

        {/* Messages */}
        <TabDashboard.Screen
          name="MessageScreen"
          component={MessageScreen}
        />
        {/* <TabDashboard.Screen
          name="SettingAccount"
          component={SettingAccount}
          
        /> */}
            <TabDashboard.Screen name="SettingAccount">
          {(props) => (
            <SettingAccount {...props} OnSignOut={handleSignOut} />              
            )}
        </TabDashboard.Screen>

        {/*  */}
        <TabDashboard.Screen
          name="Checkout"
          component={Checkout}
        />

        <TabDashboard.Screen
          name="MessageItem"
          component={MessageItem}
        />
        <TabDashboard.Screen
          name="InformationAccount"
          component={InformationAccount}
        />
        <TabDashboard.Screen
          name="PolicyPrivacy"
          component={PolicyPrivacy}
        />
        <TabDashboard.Screen
          name="AboutApplication"
          component={AboutApplication}
        />
        <TabDashboard.Screen
          name="TermsConditions"
          component={TermsConditions}
        />
        <TabDashboard.Screen
          name="ChangePassword"
          component={ChangePassword}
        />
        
        <TabDashboard.Screen
          name="ActivityDetail"
          component={ActivityDetail}
        />

    </TabDashboard.Navigator>

  )
}

const ActivityTabNavigator =({navigation})=>{
  return(
    <RootStack.Navigator headerMode="none">
       <RootStack.Screen
          name="FirstRoute"
          component={FirstRoute}
          />
       <RootStack.Screen
          name="FoodScreen"
          component={FoodScreen}
          />
      
    </RootStack.Navigator>

  )
}

const HomeTabs = () => {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: '#7C3532',
      inactiveTintColor: 'gray',
    }}

    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Dashboard') {
          iconName = focused? 'home': 'home';
            size = focused? 30:24;
        } 
        else if (route.name === 'Activity') {
          iconName = focused ? 'leanpub' : 'leanpub';
          size = focused? 30:24;
        }
        else if (route.name === 'Trolly') {
          iconName = focused ? 'shopping-cart' : 'shopping-cart';
          size = focused? 30:24;
        }
        else if (route.name === 'Account') {
          iconName = focused ? 'user-circle-o' : 'user-circle-o';
          size = focused? 30:24;
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}

    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      
      <Tab.Screen name="Activity" component={ActivityTabNavigator} />
      
      <Tab.Screen name="Trolly" component={TrollyScreen} />

      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

// admin tab
const HomeAdminTabs = () => {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: '#7C3532',
      inactiveTintColor: 'gray',
    }}

    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Beranda') {
          iconName = focused? 'store': 'store';
            size = focused? 30:24;
        } 
        else if (route.name === 'Aktivitas') {
          iconName = focused ? 'menu-book' : 'menu-book';
          size = focused? 30:24;
        }
        else if (route.name === 'Informasi') {
          iconName = focused ? 'markunread' : 'markunread';
          size = focused? 30:24;
        }
        else if (route.name === 'Akun') {
          iconName = focused ? 'person-outline' : 'person-outline';
          size = focused? 30:24;
        }

        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
    })}

    >
      <Tab.Screen name="Beranda" component={DashboardAdmin} />
      
      <Tab.Screen name="Aktivitas" component={ActivityAdmin} />
      
      <Tab.Screen name="Informasi" component={InformationAdmin} />

      <Tab.Screen name="Akun" component={AccountAdmin} />
    </Tab.Navigator>
  );
};

const RootStack = createStackNavigator();
 
const App = ({SignOut}) => {
  // console.log(SignOut);
  
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = React.useState(false);
  
  // User Auth
  const handleSignIn = () => {
      setIsAuthenticated(true);
    };
  const handleSignOut = () => {
        setIsAuthenticated(SignOut);
      };
  // const handleSignOut = () => {
  //       setIsAuthenticated(false);
  //     };
  const handleSignUp = () => {
        setIsAuthenticated(true); //true
      };
      // <BottomTabNavigator SignOut={handleSignOut}/>
      // console.log('dua'+SignOut);
      
      // Auth Admin
      const handleSignInAdmin = () => {
          setIsAuthenticatedAdmin(true);
        };
      const handleSignOutAdmin = () => {
            setIsAuthenticatedAdmin(false);
          };
      const handleSignUpAdmin = () => {
            setIsAuthenticatedAdmin(true); //true
          };
      
    return (
      <NavigationContainer>
        <RootStack.Navigator headerMode="none">
          
          {/* Auth admin */}
          {isAuthenticatedAdmin?(
            <RootStack.Screen name="AdminTabNavigator"
            component={AdminTabNavigator}
            options={({ route, navigation }) => ({
                headerTitle: getFocusedRouteNameFromRoute(route),
                headerLeft: () => (
                    <Button
                      onPress={() =>
                        navigation.dispatch(DrawerActions.toggleDrawer())
                      }
                      title="Menu"
                    />
                  ),
                headerRight: () => (
                  <Button onPress={handleSignOutAdmin} title="Sign Out" />
                ),
              })}
            />
          )
          :
          
      // Auth  User
          isAuthenticated ? (
            <RootStack.Screen name="BottomTabNavigator"
            // component={HomeDrawer}
            component={BottomTabNavigator}
            options={({ route, navigation }) => ({
                headerTitle: getFocusedRouteNameFromRoute(route),
                headerLeft: () => (
                    <Button
                      onPress={() =>
                        navigation.dispatch(DrawerActions.toggleDrawer())
                      }
                      title="Menu"
                    />
                  ),
                headerRight: () => (
                  <Button onPress={handleSignOut} title="Sign Out" />
                ),
              })}
            />
          ) : (
        
        // Launch
            <>
              <RootStack.Screen
                name="SplashScreen">
                  {(props) => (
                   <SplashScreen {...props} onSignInAdmin={handleSignInAdmin} onSignIn={handleSignIn} />
                  )}
              </RootStack.Screen>
              <RootStack.Screen
                name="OnBoarding"
                component={OnBoardingScreen}
                options={{
                    animationTypeForReplace: 'pop',
                  }}
              />
              <RootStack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    animationTypeForReplace: 'pop',
                  }}
              />
              {/* <RootStack.Screen
                name="LoginUMKM"
                component={LoginUMKM}
                options={{
                    animationTypeForReplace: 'pop',
                  }}
              /> */}
              <RootStack.Screen name="LoginUMKM">
                {(props) => (
                  <LoginUMKM {...props} onSignIn={handleSignInAdmin} />
                  )}
              </RootStack.Screen>
              <RootStack.Screen name="LoginTamu">
                {(props) => (
                  <LoginTamu {...props} onSignIn={handleSignIn} />
                  )}
              </RootStack.Screen>
              <RootStack.Screen
                name="Sign Up"
                component={SignUpScreen}
                options={{
                    animationTypeForReplace: 'pop',
                  }}
              />
                  
              <RootStack.Screen
                name="Sign Up 2"
                component={SignUpScreen2}
                options={{
                    animationTypeForReplace: 'pop',
                  }}
              />
                  
              
              {/* <RootStack.Screen name="Sign Up">
              {(props) => (
                <SignUpScreen {...props} onSignUp={handleSignUp} />
              )}
            </RootStack.Screen> */}
              {/* <RootStack.Screen name="Sign Up 2">
              {(props) => (
                <SignUpScreen2 {...props} onSignUp={handleSignUp} />
              )} */}
              <RootStack.Screen name="Verification">
              {(props) => (
                <Verification {...props} onSignUp={handleSignUp} />
              )}
            </RootStack.Screen>
            <RootStack.Screen
              name="Password Forget"
              component={PasswordForgetScreen}
            />
            <RootStack.Screen
              name="Password Forget 2"
              component={PasswordForget2Screen}
            />

            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    );
  };
 
export default App;