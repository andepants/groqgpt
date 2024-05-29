import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { Stack } from 'expo-router'
import HeaderDropDown from '@/components/HeaderDropDown'

const Page = () => {

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () =>
            <HeaderDropDown
              title="groqGPT"
              onSelect={() => {}}
              items={[
                { key: 'share', title: 'share Dalle', icon: 'square.and.arrow.up' },
                { key: 'details', title: 'See Details', icon: 'info.circle' },
                { key: 'keep', title: 'Keep in Sidebar', icon: 'pin' },
              ]}
            />,
        }}
      />
    </View>
  )
}

export default Page