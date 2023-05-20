import React, { useState, useEffect } from 'react'
import { View, ScrollView, useWindowDimensions } from 'react-native'
import OrderItem from '../../components/order/orderItem'
import admin from '../../api/admin'
export default function OrderPage () {
  const { width, height } = useWindowDimensions()

  const [orders, setOrders] = useState([])

  async function fetchOrder () {
    const data = await admin.getCurrentOrder()
    setOrders(data.data.data)
    console.log(orders)
  }

  async function cancelOrder (id) {
    const { data } = await admin.cancelCurrentOrder(id)
    console.log(data)
  }

  async function deliveryOrder (id) {
    const { data } = await admin.deliveryOrder(id)
    console.log(data)
  }

  useEffect(() => {
    fetchOrder()
  }, [])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width, height, backgroundColor: '#ccc' }}>
      <ScrollView>
        {orders.map((order, index) => {
          return <OrderItem key={index} data={order} cancleFunc={() => { cancelOrder(order.orderid) }} deliveryFunc={() => { deliveryOrder(order.orderid) }}></OrderItem>
        })}
      </ScrollView>
    </View>
  )
}
