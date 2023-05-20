import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import store from '../redux/store'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginPage from '../screens/auth/login'
import SignupPage from '../screens/auth/signup'
import RootHomepage from '../screens/home/rootHomePage'
import ProductDetail from '../screens/home/productDetail'
import AddProduct from '../screens/home/addProduct'
import storage from '../helper/storage'

import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../redux/auth'
import AdjustProduct from '../screens/home/adjustProduct'
const Stack = createNativeStackNavigator()
const noHeaderOptions = {
  headerShown: false
}
export default function MyNavigator () {
  const dispatch = useDispatch()
  storage.get('token').then(value => {
    if (value !== null) dispatch(authActions.loadToken(value))
  })
  const isLogin = useSelector(state => state.auth.isLogin)
  useEffect(() => {}, [isLogin])
  return (
    <NavigationContainer>
      {store.getState().auth.isLogin
        ? <Stack.Navigator>
          <Stack.Screen name='home' component={RootHomepage} options={{ headerShown: false }} />
          <Stack.Screen name='product-detail' component={ProductDetail} options={{ headerShown: false }} />
          <Stack.Screen name='add-product' component={AddProduct} options={{ headerShown: true }} />
          <Stack.Screen name='adjust-product' component={AdjustProduct} options={{ headerShown: true }} />
        </Stack.Navigator>
        : <Stack.Navigator>
          <Stack.Screen name="login" component={LoginPage} options={noHeaderOptions} />
          <Stack.Screen name="sign-up" component={SignupPage} options={noHeaderOptions} />
        </Stack.Navigator>
      }
    </NavigationContainer>
  )
}
