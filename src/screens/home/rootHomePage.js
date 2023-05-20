import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Product from './product'
import MyTabBar from '../../components/bottomNavigationBar'
import HistoryPage from '../history/history'
import OrderPage from '../orders/order'
import RootProfilePage from '../profile/rootProfilePage'

const noHeaderOptions = {
  headerShown: false
}
const Tab = createBottomTabNavigator()

export default function RootHomepage () {
  return <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
    <Tab.Screen name='Product' component={Product} options={noHeaderOptions} />
    <Tab.Screen name='History' component={HistoryPage} options={noHeaderOptions} />
    <Tab.Screen name='Order' component={OrderPage} options={noHeaderOptions} />
    <Tab.Screen name='Account' component={RootProfilePage} options={noHeaderOptions} />
  </Tab.Navigator>
}
