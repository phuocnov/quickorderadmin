import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { Button, Flex, Spacer, Text } from '@react-native-material/core'
import CategoryButton from '../../components/categoryButton'
import store from '../../redux/store'
import product from '../../api/product'
import { useDispatch } from 'react-redux'
import { drinkItemActions } from '../../redux/drinkItem'
import { categoryActions } from '../../redux/category'
import ProductItem from '../../components/productItem'
import admin from '../../api/admin'

export default function Product ({ navigation }) {
  const { width, height } = useWindowDimensions()
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])
  const [cateSelected, setCateSelected] = useState(-1)
  const [productList, setProductList] = useState([])

  store.subscribe(() => {
    setProductList(store.getState().drink.drinks)
    setCategories(store.getState().category.categories)
    setCateSelected(store.getState().category.selected)
  })

  async function fetchProduct () {
    product.getProducts().then((res) => {
      const data = res.data.data
      dispatch(drinkItemActions.setDrink(data))
      console.log(data)
    })
  }

  async function fetchCategories () {
    product.getCategories().then((res) => {
      const data = res.data.categories
      dispatch(categoryActions.set(data))
    })
  }

  useEffect(() => {
    fetchProduct()
    fetchCategories()
  }, [])

  useEffect(() => {
  }, [cateSelected, productList])

  async function deleteProduct (id) {
    const { data } = await admin.deleteProduct(id)
    console.log(data)
  }
  return (
    <View style={{ display: 'flex', width, height, flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Flex style={{ marginTop: 30, alignItems: 'center' }} direction='row'>
          <Text>Sản phẩm</Text>
          <Spacer></Spacer>
          <Button title="Thêm sảm phẩm" onPress={() => { navigation.navigate('add-product') }}/>
        </Flex>
        <Flex direction='row'>
          {categories.map((cate, index) => {
            return <CategoryButton
              key={index}
              selected={cate.categoryid === store.getState().category.selected}
              title={cate.categoryname}
              onPress={() => {
                if (store.getState().category.selected !== -1) {
                  dispatch(categoryActions.select(-1))
                  dispatch(drinkItemActions.filterByTag(-1))
                } else {
                  dispatch(categoryActions.select(cate.categoryid))
                  dispatch(drinkItemActions.filterByTag(cate.categoryid))
                }
              }} />
          })}
          <Button title="Thêm loại"/>
        </Flex>
        {productList.map((product, index) => {
          return <ProductItem
            key={product.clotheid}
            imgsrc={product.clotheimage}
            title={product.clothename}
            price={product.price}
            handleClick={() => {
              navigation.navigate('product-detail', { clotheid: product.clotheid })
            }}
          handleDelete={() => { deleteProduct(product.clotheid) }}
          />
        })}
      </ScrollView>
    </View >
  )
}

Product.propTypes = {
  navigation: PropTypes.any
}
