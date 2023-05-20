import { Flex, Spacer, Text } from '@react-native-material/core'
import React from 'react'
import { Image, useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { formatCurrency } from 'react-native-format-currency'
import { Ionicons } from '@expo/vector-icons'

export default function ProductItem ({ handleClick, title, price, imgsrc, handleDelete }) {
  const { width } = useWindowDimensions()
  return <TouchableOpacity
    style={{ width, borderStyle: 'solid', borderWidth: 1, borderRadius: 10, height: 60 }}
    onPress={() => handleClick()}>
    <Flex direction='row'>
      <Image
        source={{ uri: imgsrc }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 8,
          alignSelf: 'center'
        }} />
      <Flex>
        <Text style={style.drinkName}>{title}</Text>
        <Text style={style.price}>{formatCurrency({ amount: parseInt(price), code: 'VND' })[0]}</Text>
      </Flex>
      <Spacer></Spacer>
      <TouchableOpacity onPress={() => { handleDelete() }}>
        <Ionicons name='trash-bin-outline' style={{ fontSize: 20, justifyContent: 'center' }}></Ionicons>
      </TouchableOpacity>
    </Flex>
  </TouchableOpacity>
}
const style = StyleSheet.create({
  drinkName: {
    fontSize: 12,
    fontFamily: 'Roboto_400Regular',
    left: 10,
    paddingTop: 10
  },
  price: {
    fontSize: 14,
    fontFamily: 'Roboto_500Medium',
    left: 10,
    color: '#F6AC31',
    paddingTop: 5
  }
})
ProductItem.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  price: PropTypes.number,
  handleDelete: PropTypes.func,
  imgsrc: PropTypes.string
}
