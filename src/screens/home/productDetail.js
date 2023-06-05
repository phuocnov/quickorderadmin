import React, { useEffect, useState } from 'react'
import { View, Image, Text, useWindowDimensions, StyleSheet, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import BackButton from '../../components/backButton'
import { Box, Flex, Spacer, Button } from '@react-native-material/core'
import { formatCurrency, getSupportedCurrencies } from 'react-native-format-currency'
import product from '../../api/product'

export default function ProductDetail ({ route, navigation }) {
  const { width } = useWindowDimensions()
  const { drinkid } = route.params
  const [price] = useState(0)
  const [productData, setProductData] = useState({
    drink: {
      categoryid: 1,
      drinkid: 1,
      drinkimage: 'https://xuongsiquanao.vn/wp-content/uploads/2018/02/1475035832336_73870.jpg',
      drinkname: 'BỘ THỂ THAO NAM ADIDAS',
      description: 'Chất liệu: Áo Cotton lụa / Quần Nỉ Cotton',
      status: 'Available'
    },
    topping: [],
    size: [
      {
        namesize: 'L',
        price: 20000.0,
        sizeid: 1
      },
      {
        namesize: 'XL',
        price: 25000.0,
        sizeid: 2
      },
      {
        namesize: 'XXL',
        price: 30000.0,
        sizeid: 3
      }
    ]

  })
  getSupportedCurrencies()

  async function fetchProductDetail () {
    product.getProduct(drinkid).then(res => {
      const data = res.data.data
      setProductData(data)
      console.log(data)
    })
  }

  useEffect(() => {
    fetchProductDetail()
  }, [])

  return <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f5f5f5' }}>
      <ScrollView style={{ flex: 1 }}>
        <Box style={style.headerContainer}>
          <Image source={{ uri: productData.drink.drinkimage }} style={{ width, height: 200 }} />
          <Box style={{ padding: 20 }}>
            <Text style={style.name}>{productData.drink.drinkname}</Text>
            <Text style={style.price}>{formatCurrency({ amount: price, code: 'VND' })[0]}</Text>
            <Text style={style.description}>{productData.drink.description}</Text>
          </Box>
        </Box>
        <Box style={{ width, backgroundColor: '#fff', marginTop: 10, padding: 10 }}>
          <Box>
            <Text style={style.sectionTitle}>Size</Text>
            {productData.size.map((size, index) => {
              return <Flex key={index} direction='row' style={{ width: width * 0.9, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 16 }}>{size.namesize}</Text>
                <Spacer />
                <Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 16 }}>{formatCurrency({ amount: parseInt(size.price), code: 'VND' })[0]}</Text>
              </Flex>
            })
            }
          </Box>
        </Box>
        <Box style={{ width, backgroundColor: '#fff', marginTop: 10, padding: 10 }}>
          <Text style={style.sectionTitle}>Màu sắc</Text>
          {productData.topping.map((tp, index) => {
            return <Flex key={index} direction="row" style={{ marginTop: 10 }}>
              <Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 16, marginLeft: 5 }}>{tp.nametopping}</Text>
              <Spacer />
              <Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 16 }}>{formatCurrency({ amount: tp.price, code: 'VND' })[0]}</Text>
            </Flex>
          })}
        </Box>
        <Box style={{ height: 130 }} />
        <Button title="Chỉnh sửa thông tin" onPress={() => { navigation.navigate('adjust-product', { productData }) }}></Button>
      </ScrollView>
      {/* Footer */}
      {/* <Box
        style={{ ...style.footerContainer, ...{ width } }}>
        <Flex
          direction='row'
          style={{
            width: 120,
            height: 70,
            backgroundColor: '#fff',
            justifyContent: 'center',
            marginTop: 10
          }}>
          <ItemCountButton title={'-'} onPress={() => { decreaseNumber() }}
            disabled={formik.values.number === 1} />
          <Spacer />
          <Text style={style.footerCountText}>{formik.values.number}</Text>
          <Spacer />
          <ItemCountButton title={'+'} onPress={() => increaseNumber()} />
        </Flex>
        <Button title={<Flex direction='row'>
          <Text style={{
            fontFamily: 'Roboto_500Medium',
            color: '#fff',
            fontSize: 14
          }}>Thêm vào giỏ hàng</Text>
          <Spacer />
          <Text style={{
            fontFamily: 'Roboto_500Medium',
            color: '#fff',
            fontSize: 14
          }}>{formatCurrency({ amount: price, code: 'VND' })[0]}</Text>
        </Flex>}
          style={{ width: width * 0.8, bottom: 20, height: 40, justifyContent: 'center' }}
          color={'#F6AC31'}
          titleStyle={{ color: '#fff' }}
          onPress={() => {
            formik.setFieldValue('price', price).then(() => {
              formik.submitForm()
              navigation.goBack()
            })
          }} />
      </Box> */}
      <BackButton clickHandler={() => { navigation.goBack() }} />
  </View>
}
const style = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff'
  },
  name: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 18,
    color: '#272727'
  },
  price: {
    fontFamily: 'Roboto_500Medium',
    color: '#F6AC31',
    fontSize: 20,
    paddingTop: 5
  },
  description: {
    flexWrap: 'wrap',
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#888',
    paddingTop: 15
  },
  sectionTitle: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 20,
    color: '#272727',
    marginBottom: 10
  },
  footerContainer: {
    height: 120,
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 1,
    alignItems: 'center'
  },
  footerCountText: {
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
    color: '#aaa',
    borderWidth: 1,
    padding: 10,
    borderColor: '#aaa',
    height: 40,
    borderRadius: 7
  }
})

ProductDetail.propTypes = {
  navigation: PropTypes.any,
  route: PropTypes.any
}
