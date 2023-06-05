import React, { useState, useEffect } from 'react'
import { View, ScrollView, useWindowDimensions } from 'react-native'
import OrderItem from '../../components/order/orderItem'
import admin from '../../api/admin'
import { useDispatch } from 'react-redux'
import { orderActions } from '../../redux/order'
import store from '../../redux/store'

export default function OrderPage () {
  const { width, height } = useWindowDimensions()
  const [orders, setOrders] = useState([])
  const dispatch = useDispatch()

  store.subscribe(() => {
    setOrders(store.getState().order.currentOrders)
    if (store.getState().order.requestFetch === true) {
      fetchOrder()
    }
  })
  async function fetchOrder () {
    const data = await admin.getCurrentOrder()
    // setOrders(data.data.data)
    dispatch(orderActions.setCurrentOrders(data.data.data))
    dispatch(orderActions.setRequestFetch(false))
    console.log(orders)
  }

  async function cancelOrder (id) {
    const { data } = await admin.cancelCurrentOrder(id)
    dispatch(orderActions.setRequestFetch(true))
    console.log(data)
  }

  async function deliveryOrder (id) {
    const { data } = await admin.deliveryOrder(id)
    dispatch(orderActions.setRequestFetch(true))
    console.log(data)
  }

  useEffect(() => {
    fetchOrder()
  }, [])
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
        backgroundColor: '#ccc'
      }}
    >
      <ScrollView>
        {orders.map((order, index) => {
          return (
            <OrderItem
              key={index}
              data={order}
              cancleFunc={() => {
                cancelOrder(order.orderid)
              }}
              deliveryFunc={() => {
                deliveryOrder(order.orderid)
              }}
            ></OrderItem>
          )
        })}
      </ScrollView>
    </View>
  )
}
