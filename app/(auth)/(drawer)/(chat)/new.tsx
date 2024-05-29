import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import { Stack } from 'expo-router';
import HeaderDropDown from '@/components/HeaderDropDown';

const Page = () => {
  const { signOut } = useAuth();
  const [gptVersion, setGptVersion] = useState('3.5');
  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () =>
            <HeaderDropDown
              title="groqGPT"
              onSelect={(key) => { setGptVersion(key) }}
              selected={gptVersion}
              items={[
                { key: '3.5', title: 'GPT-3.5', icon: 'bolt' },
                { key: '4', title: 'GPT-4', icon: 'sparkles' },
              ]}
            />,
        }}
      />
      <Button title='sign out' onPress={() => signOut()}></Button>
    </View>
  )
}

export default Page