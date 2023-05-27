import { Button, Text, TextInput } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import store from '../../redux/store'
import { useFormik } from 'formik'
import SelectDropdown from 'react-native-select-dropdown'
import ProductSizeInput from '../../components/productSizeInput'
// import ProductToppingInput from '../../components/productToppingInput'
import admin from '../../api/admin'
export default function AddProduct ({ navigation }) {
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
      categories.map(cate => {
        temp.push(cate.categoryname)
        return setCategoriesDisplay(temp)
      })
    }
    console.log(categoriesDisplay)
  }

  useEffect(() => {
    exportCategory()
  }, [categories])

  const formik = useFormik({
    initialValues: {
      drinkname: '',
      drinkimage: '',
      description: '',
      categoryid: 1,
      size: [],
      topping: []
    },
    onSubmit: (values) => {
      console.log(values)
      admin.createProduct(values).then(res => {
        console.log(res.data)
      })
    }
  })

  function addFormSize (checked, sizeData) {
    const { namesize } = sizeData
    const temp = formik.values.size

    if (checked) {
      temp.push(sizeData)
      formik.setFieldValue('size', temp)
    } else {
      const index = temp.findIndex((value) => value === namesize)
      temp.splice(index)
    }
  }

  function setFormPrice (value, index) {
    const temp = sizes
    temp[index].price = value
    setSizes(temp)
  }

  // function addTopping () {
  //   const temp = toppings
  //   const topping = {
  //     nametopping: 'topping name',
  //     price: 0
  //   }
  //   setToppings(temp.push(topping))
  //   console.log(toppings)
  // }

  return <View style={{ backgroundColor: '#ddd', flex: 1 }}>
    <ScrollView>
      <Text>Loại sản phẩm</Text>
      <SelectDropdown
        data={categoriesDisplay}
        onSelect={(selectedItem) => {
          const { categoryid } = categories.find((cate) => { return cate.categoryname === selectedItem })
          formik.setFieldValue('categoryid', categoryid)
          console.log(formik.values)
        }}
      />
      <Text>Tên sản phẩm</Text>
      <TextInput onChangeText={(value) => { formik.setFieldValue('drinkname', value) }} />
      <Text>Ảnh sản phẩm</Text>
      <TextInput onChangeText={(value) => { formik.setFieldValue('drink', value) }} />
      <Text>Mô tả sản phẩm</Text>
      <TextInput onChangeText={(value) => { formik.setFieldValue('description', value) }} />
      <Text>Kích thước sản phẩm</Text>
      {sizes.map((size, index) => {
        return <ProductSizeInput key={index} onSelect={(checked) => { addFormSize(checked, size) }} sizeName={size.namesize} onInputChange={(value) => setFormPrice(value, index)}/>
      })}
      {/* <Text>Topping</Text>
      {toppings.map((topping, index) => {
        return <ProductToppingInput
          key={index}
          onSelect={(checked) => { addFormSize(checked) }}
          setName={(value) => setFormPrice(value, index)} />
      })} */}
      {/* <Button title="Thêm topping" onPress={() => { addTopping() }}></Button> */}
      <Button title="Lưu" onPress={() => { formik.submitForm() }}></Button>
    </ScrollView>
  </View>
}

AddProduct.propTypes = {
  navigation: PropTypes.any
}
