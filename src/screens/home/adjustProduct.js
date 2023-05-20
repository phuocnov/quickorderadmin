import { Button, Text, TextInput } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import store from '../../redux/store'
import { useFormik } from 'formik'
import SelectDropdown from 'react-native-select-dropdown'
import ProductSizeInput from '../../components/productSizeInput'
import product from '../../api/product'

export default function AdjustProduct ({ route, navigation }) {
  const { clotheid } = route.params
  const [productData, setProductData] = useState({
    clothe: {
      categoryid: 1,
      clotheid: 1,
      clotheimage: 'https://xuongsiquanao.vn/wp-content/uploads/2018/02/1475035832336_73870.jpg',
      clothename: 'BỘ THỂ THAO NAM ADIDAS',
      description: 'Chất liệu: Áo Cotton lụa / Quần Nỉ Cotton',
      status: 'Available'
    },
    color: [],
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

  async function fetchProductDetail () {
    product.getProduct(clotheid).then(res => {
      const data = res.data.data
      setProductData(data)
    })
  }
  useEffect(() => {
    fetchProductDetail()
  }, [])

  const formik = useFormik({
    initialValues: {
      clothe: {
        categoryid: '',
        description: '',
        clotheid: 0,
        clotheimage: '',
        clothename: ''
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
      <TextInput defaultValue={productData.clothe.clothename} onChange={(value) => {
        const tempForm = productData.clothe
        tempForm.clothename = value
        formik.setFieldValue('clothe', clotheid)
        console.log(formik.values)
      }} />
      <Text>Ảnh sản phẩm</Text>
      <TextInput defaultValue={productData.clothe.clotheimage} onChange={(value) => { formik.setFieldValue('clotheimage', value) }} />
      <Text>Mô tả sản phẩm</Text>
      <TextInput defaultValue={productData.clothe.description} onChange={(value) => { formik.setFieldValue('description', value) }} />
      <Text>Kích thước sản phẩm</Text>
      {productData.size.map((size, index) => {
        return <ProductSizeInput key={index} onSelect={(checked) => { addFormSize(checked, size) }} sizeName={size.namesize} defaultPrice={size.price} onInputChange={(value) => setFormPrice(value, index)} />
      })}
      <Text>Màu sắc</Text>
      {productData.color.map((color, index) => {
        return <ProductSizeInput key={index} onSelect={(checked) => { addFormSize(checked, color) }} sizeName={color.namecolor} onInputChange={(value) => setFormPrice(value, index)} />
      })}
      <Button title="Lưu" onPress={() => { formik.submitForm() }}></Button>
    </ScrollView>
  </View>
}

AdjustProduct.propTypes = {
  navigation: PropTypes.any,
  route: PropTypes.any
}
