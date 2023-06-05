import React, { useState, useEffect } from 'react'
import { View, ScrollView, useWindowDimensions } from 'react-native'
import admin from '../../api/admin'
import HistoryItem from '../../components/history/historyItem'
import store from '../../redux/store'
import { useDispatch } from 'react-redux'
import { orderActions } from '../../redux/order'

export default function HistoryPage () {
  const { width, height } = useWindowDimensions()
  const [orders, setOrders] = useState([])
  const dispatch = useDispatch()

  store.subscribe(() => {
    setOrders(store.getState().order.historyOrders)
    if (store.getState().order.requestFetch === true) {
      fetchOrder()
    }
  })

  async function fetchOrder () {
    const data = await admin.getHistory()
    dispatch(orderActions.setHistoryOrders(data.data.data))
    dispatch(orderActions.setRequestFetch(false))
    console.log(orders)
  }
  useEffect(() => {
    fetchOrder()
  }, [])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width, height, backgroundColor: '#ccc' }}>
      <ScrollView>
        {
          orders.map((order, index) => {
            return <HistoryItem data={order} key={index} disabled={true}/>
          })
        }
      </ScrollView>
    </View>
  )
}
