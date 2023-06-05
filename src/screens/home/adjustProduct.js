import { Button, Text, TextInput } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import store from '../../redux/store'
import { useFormik } from 'formik'
import SelectDropdown from 'react-native-select-dropdown'
import ProductSizeInput from '../../components/productSizeInput'

export default function AdjustProduct ({ route, navigation }) {
  const { productData } = route.params
  // const [productData, setProductData] = useState({})
  const [categories] = useState(store.getState().category.categories)
  const [categoriesDisplay, setCategoriesDisplay] = useState([])
  const [sizes, setSizes] = useState([
    {
      namesize: 'S',
      price: 0
    },
    {
      namesize: 'M',
      price: 0
    },
    {
      namesize: 'L',
      price: 0
    }
  ])
  function exportCategory () {
    setCategoriesDisplay([])
    const temp = categoriesDisplay
    if (categoriesDisplay.length === 0) {
      categories.map((cate) => {
        temp.push(cate.categoryname)
        return setCategoriesDisplay(temp)
      })
    }
    console.log(categoriesDisplay)
  }

  useEffect(() => {
    exportCategory()
  }, [categories])

  // async function fetchProductDetail () {
  //   product.getProduct(drinkid).then((res) => {
  //     const data = res.data.data
  //     setProductData(data)
  //   })
  // }
  // useEffect(() => {
  //   fetchProductDetail()
  // }, [])

  const formik = useFormik({
    initialValues: {
      drink: {
        categoryid: '',
        description: '',
        drinkid: 0,
        drinkimage: '',
        drinkname: ''
      },
      size: [],
      color: []
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  function addFormSize (checked, sizeData) {
    const { namesize } = sizeData
    const temp = formik.values.size

    if (checked) {
      temp.push(sizeData)
    } else {
      const index = temp.findIndex((value) => value === namesize)
      temp.splice(index)
    }
    formik.setFieldValue('size', temp)
    console.log(formik.values)
  }

  function setFormPrice (value, index) {
    const temp = sizes
    temp[index].price = value
    setSizes(temp)
    console.log(sizes)
  }

  return (
    <View style={{ backgroundColor: '#ddd', flex: 1 }}>
        <ScrollView>
          <Text>Loại sản phẩm</Text>
          <SelectDropdown
            data={categoriesDisplay}
            onSelect={(selectedItem) => {
              const { categoryid } = categories.find((cate) => {
                return cate.categoryname === selectedItem
              })
              formik.setFieldValue('categoryid', categoryid)
              console.log(formik.values)
            }}
          />
          <Text>Tên sản phẩm</Text>
          <TextInput
            defaultValue={productData.drink.drinkname}
            onChange={(value) => {
              const tempForm = productData.drink
              tempForm.drinkname = value
              formik.setFieldValue('drink', productData.drink.drinkid)
              console.log(formik.values)
            }}
          />
          <Text>Ảnh sản phẩm</Text>
          <TextInput
            defaultValue={productData.drink.drinkimage}
            onChange={(value) => {
              formik.setFieldValue('drinkimage', value)
            }}
          />
          <Text>Mô tả sản phẩm</Text>
          <TextInput
            defaultValue={productData.drink.description}
            onChange={(value) => {
              formik.setFieldValue('description', value)
            }}
          />
          <Text>Kích thước sản phẩm</Text>
          {productData.size.map((size, index) => {
            return (
              <ProductSizeInput
                key={index}
                onSelect={(checked) => {
                  addFormSize(checked, size)
                }}
                sizeName={size.namesize}
                defaultPrice={size.price}
                onInputChange={(value) => setFormPrice(value, index)}
              />
            )
          })}
          <Text>Topping</Text>
          {productData.topping.map((topping, index) => {
            return (
              <ProductSizeInput
                key={index}
                onSelect={(checked) => {
                  addFormSize(checked, topping)
                }}
                sizeName={topping.nametopping}
                onInputChange={(value) => setFormPrice(value, index)}
              />
            )
          })}
          <Button
            title="Lưu"
            onPress={() => {
              formik.submitForm()
            }}
          ></Button>
        </ScrollView>
    </View>
  )
}

AdjustProduct.propTypes = {
  navigation: PropTypes.any,
  route: PropTypes.any
}
