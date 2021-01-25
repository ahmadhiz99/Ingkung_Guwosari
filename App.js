import 'react-native-gesture-handler';
// import React, { useEffect } from 'react';

// import AsyncStorage from '@react-native-community/async-storage'

// import {NavigationContainer} from '@react-navigation/native'
// import {createStackNavigator} from '@react-navigation/stack'

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import OnBoardingScreens from './src/screens/onBoarding/index.js';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import LoginScreen from './src/screens/Login/LoginScreen'
// import LoginTamu from './src/screens/Login/LoginTamu'
// import LoginUMKM from './src/screens/Login/LoginUMKM'
// import SignUp from './src/screens/Login/SignUp'
// import SignUp2 from './src/screens/Login/SignUp2'
// import Verification from './src/screens/Login/Verification'
// import ResetPassword from './src/screens/Login/ResetPassword'
// import ResetPassword2 from './src/screens/Login/ResetPassword2'
// import IndexDasboard from './src/screens/MenuTamu'

// import HomeScreen from './src/screens/MenuTamu/pages/HomeScreen';
// import DetailsScreen from './src/screens/MenuTamu/pages/DetailsScreen';
// import ProfileScreen from './src/screens/MenuTamu/pages/ProfileScreen';
// import SettingsScreen from './src/screens/MenuTamu/pages/SettingsScreen';


// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// function HomeStack() {
//   return (
//       <Stack.Navigator
//         initialRouteName="Home"
//         screenOptions={{
//           headerStyle: { backgroundColor: '#42f44b' },
//           headerTintColor: '#fff',
//           headerTitleStyle: { fontWeight: 'bold' }
//         }}>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{ title: 'Home Page' }}/>
//         <Stack.Screen
//           name="Details"
//           component={DetailsScreen}
//           options={{ title: 'Details Page' }} />
//       </Stack.Navigator>
//   );
// }

// function SettingsStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Settings"
//       screenOptions={{
//         headerStyle: { backgroundColor: '#42f44b' },
//         headerTintColor: '#fff',
//         headerTitleStyle: { fontWeight: 'bold' }
//       }}>
//       <Stack.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{ title: 'Setting Page' }}/>
//       <Stack.Screen
//         name="Details"
//         component={DetailsScreen}
//         options={{ title: 'Details Page' }}/>
//       <Stack.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{ title: 'Profile Page' }}/>
//     </Stack.Navigator>
//   );
// }

// // Stack

// function NavStack() {
//   return (
   

// // {
//   /* <Tab.Navigator
//         initialRouteName="Feed"
//         tabBarOptions={{
//           activeTintColor: '#42f44b',
//         }}>
//         <Tab.Screen
//           name="HomeStack"
//           component={HomeStack}
//           options={{
//             tabBarLabel: 'Home',
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome
//                 name="home"
//                 color={color}
//                 size={size}
//               />
//             ),
//           }}  />
//         <Tab.Screen
//           name="SettingsStack"
//           component={SettingsStack}
//           options={{
//             tabBarLabel: 'Settings',
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome
//                 name="android"
//                 color={color}
//                 size={size}
//               />
//             ),
//           }} />
//       </Tab.Navigator>
//   ); 
// */
// // }
// <Stack.Navigator>
//       {/* Stack screen */}
//     <Stack.Screen  
//       name="LoginScreen" 
//       component={LoginScreen} 
//       // options={{ title: 'LoginScreen' }}
//     />
//     <Stack.Screen 
//       name="LoginTamu" 
//       component={LoginTamu} 
//       options={{ title: 'LoginTamu' }}
//     />
//     <Stack.Screen 
//     name="LoginUMKM" 
//     component={LoginUMKM} 
//     options={{ title: 'LoginUMKM' }}
//     />
//     <Stack.Screen 
//     name="SignUp" 
//     component={SignUp} 
//     options={{ title: 'SignUp' }}
//     />
//     <Stack.Screen 
//     name="SignUp2" 
//     component={SignUp2} 
//     options={{ title: 'SignUp2' }}
//     />
//     <Stack.Screen 
//     name="Verification" 
//     component={Verification} 
//     options={{ title: 'Verification' }}
//     />
//     <Stack.Screen 
//     name="ResetPassword" 
//     component={ResetPassword} 
//     options={{ title: 'ResetPassword' }}
//     />
//     <Stack.Screen 
//     name="ResetPassword2" 
//     component={ResetPassword2} 
//     options={{ title: 'ResetPassword2' }}
//     />
//     <Stack.Screen 
//     name="IndexDasboard" 
//     component={IndexDasboard} 
//     options={{ title: 'IndexDasboard' }}
//     />
//  </Stack.Navigator>

   
//   );
// }

// const App =()=>{
//   const [isFirstLaunch, setFirstLaunch] = React.useState(null);

//   useEffect(()=>{
//     AsyncStorage.getItem('alredyLaunched').then(value=>{
//       if(value==null){
//         AsyncStorage.setItem('alredyLaunched','true');
//         setFirstLaunch(true);
//       }else{
//         setFirstLaunch(false)
//       }
//     });
//   },[]);

  
//   if(isFirstLaunch == null){
//     return null;
//   }else if(isFirstLaunch == true){
//     return(
//       <NavigationContainer>
//         <Stack.Navigator headerMode="none">
//           <Stack.Screen name="OnBoarding" component={OnBoardingScreens} />
//           <Stack.Screen name="Login" component={LoginScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     )
//   }else{

//     return(
      
//       <NavigationContainer>
         
//           <NavStack />
         
//       </NavigationContainer>
//     )
//   }

// } 


// // Tab
// // function App() {
// //   return (
// //     <NavigationContainer>
// //       <Tab.Navigator
// //         initialRouteName="Feed"
// //         tabBarOptions={{
// //           activeTintColor: '#42f44b',
// //         }}>
// //         <Tab.Screen
// //           name="HomeStack"
// //           component={HomeStack}
// //           options={{
// //             tabBarLabel: 'Home',
// //             tabBarIcon: ({ color, size }) => (
// //               <FontAwesome
// //                 name="home"
// //                 color={color}
// //                 size={size}
// //               />
// //             ),
// //           }}  />
// //         <Tab.Screen
// //           name="SettingsStack"
// //           component={SettingsStack}
// //           options={{
// //             tabBarLabel: 'Settings',
// //             tabBarIcon: ({ color, size }) => (
// //               <FontAwesome
// //                 name="android"
// //                 color={color}
// //                 size={size}
// //               />
// //             ),
// //           }} />
// //       </Tab.Navigator>
// //     </NavigationContainer>
// //   );
// // }


// export default App;


// {/* <Stack.Navigator headerMode="none">
//     <Stack.Screen  
//       name="LoginScreen" 
//       component={LoginScreen} 
//       // options={{ title: 'LoginScreen' }}
//     />
//     <Stack.Screen 
//       name="LoginTamu" 
//       component={LoginTamu} 
//       options={{ title: 'LoginTamu' }}
//     />
//     <Stack.Screen 
//     name="LoginUMKM" 
//     component={LoginUMKM} 
//     options={{ title: 'LoginUMKM' }}
//     />
//     <Stack.Screen 
//     name="SignUp" 
//     component={SignUp} 
//     options={{ title: 'SignUp' }}
//     />
//     <Stack.Screen 
//     name="SignUp2" 
//     component={SignUp2} 
//     options={{ title: 'SignUp2' }}
//     />
//     <Stack.Screen 
//     name="Verification" 
//     component={Verification} 
//     options={{ title: 'Verification' }}
//     />
//     <Stack.Screen 
//     name="ResetPassword" 
//     component={ResetPassword} 
//     options={{ title: 'ResetPassword' }}
//     />
//     <Stack.Screen 
//     name="ResetPassword2" 
//     component={ResetPassword2} 
//     options={{ title: 'ResetPassword2' }}
//     />
//     <Stack.Screen 
//     name="IndexDasboard" 
//     component={IndexDasboard} 
//     options={{ title: 'IndexDasboard' }}
//     />
//  </Stack.Navigator>

   
//   );
// } */}





import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainApp from './src/App' 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 
const App = () => {
  return (
    <MainApp />
  );
};
 
export default App;