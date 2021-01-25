// // React Native Bottom Navigation
// // https://aboutreact.com/react-native-bottom-navigation/

// import 'react-native-gesture-handler';

// import * as React from 'react';

// import
//  FontAwesome
// from 'react-native-vector-icons/FontAwesome';

// import {
//   NavigationContainer
// } from '@react-navigation/native';
// import {
//   createStackNavigator
// } from '@react-navigation/stack';
// import {
//   createBottomTabNavigator
// } from '@react-navigation/bottom-tabs';

// import HomeScreen from './pages/HomeScreen';
// import DetailsScreen from './pages/DetailsScreen';
// import ProfileScreen from './pages/ProfileScreen';
// import SettingsScreen from './pages/SettingsScreen';

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

// function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
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
//     </NavigationContainer>
//   );
// }
// export default App;


// import Ract from 'react'
// import {component, View, Text} from 'react-native'

// const MenuTamu =()=>{
//   return(
//     <View>
//       <Text>Dashboard</Text>
//     </View>
//   )
// }

// export default MenuTamu;