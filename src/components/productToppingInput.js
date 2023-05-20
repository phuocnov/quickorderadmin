import { Flex, Spacer, TextInput } from '@react-native-material/core'
import CheckBox from 'expo-checkbox'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useWindowDimensions } from 'react-native'

export default function ProductToppingInput (props) {
  const { width } = useWindowDimensions()
  const { onSelect, setPrice, setName } = props
  const [checked, setChecked] = useState(true)
  return <Flex direction='row' style={{ width }}>
    <CheckBox
      color={'#F6AC31'}
      value={checked}
      onValueChange={() => {
        onSelect(!checked)
        setChecked(!checked)
      }} />
      <Spacer/>
      <TextInput style={{ width: width * 0.4 }} onChangeText={(text) => { setName(text) }}/>
      <Spacer/>
      <TextInput style={{ width: width * 0.4 }} onChangeText={(text) => { setPrice(text) }}/>
  </Flex>
}

ProductToppingInput.propTypes = {
  onSelect: PropTypes.func,
  sizeName: PropTypes.string,
  setPrice: PropTypes.func,
  setName: PropTypes.func
}
