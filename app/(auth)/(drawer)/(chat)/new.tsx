import { View, Text, Button, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import { Stack } from 'expo-router';
import HeaderDropDown from '@/components/HeaderDropDown';
import MessageInput from '@/components/MessageInput';

const Page = () => {
  const { signOut } = useAuth();
  const [gptVersion, setGptVersion] = useState('3.5');

  const getCompletion = (message: string) => {
    console.log('get completion for message: ', message);
  }
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
      <View style={{ flex: 1}}>
        <Text>Dummy Content</Text>
        <Button title='sign out' onPress={() => signOut()}></Button>
        {/* {Array(100).fill(0).map((_, i) => <Text key={i}>{i}</Text>)} */}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={70}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
        }}
      >
        <MessageInput onShouldSendMessage={getCompletion}/>
      </KeyboardAvoidingView>
    </View>
  )
}

export default Page