import React, { useState, useEffect } from 'react'
import { View, ScrollView, useWindowDimensions } from 'react-native'
import admin from '../../api/admin'
import HistoryItem from '../../components/history/historyItem'
export default function HistoryPage () {
  const { width, height } = useWindowDimensions()

  const [orders, setOrders] = useState([])

  async function fetchOrder () {
    const data = await admin.getHistory()
    setOrders(data.data.data)
    console.log(data.data.data)
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
