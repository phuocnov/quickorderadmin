import { Flex, Spacer, Text, TextInput } from '@react-native-material/core'
import CheckBox from 'expo-checkbox'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useWindowDimensions } from 'react-native'

export default function ProductSizeInput (props) {
  const { width } = useWindowDimensions()
  const { onSelect, sizeName, onInputChange, defaultPrice } = props
  const [checked, setChecked] = useState(false)
  return <Flex direction='row' style={{ width }}>
    <CheckBox
      color={'#F6AC31'}
      value={checked}
      onValueChange={() => {
        onSelect(!checked)
        setChecked(!checked)
      }} />
      <Spacer/>
      <Text>{sizeName}</Text>
      <Spacer/>
      <TextInput defaultValue={defaultPrice} style={{ width: width * 0.4 }} onChangeText={(text) => { onInputChange(text) }}/>
  </Flex>
}

ProductSizeInput.propTypes = {
  onSelect: PropTypes.func,
  sizeName: PropTypes.string,
  onInputChange: PropTypes.func,
  defaultPrice: PropTypes.any
}
