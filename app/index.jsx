import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const FirstPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  )
}

export default FirstPage