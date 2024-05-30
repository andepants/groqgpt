import { View, Text, Button, Platform, KeyboardAvoidingView, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import { Redirect, Stack } from 'expo-router';
import HeaderDropDown from '@/components/HeaderDropDown';
import MessageInput from '@/components/MessageInput';
import MessageIdeas from '@/components/MessageIdeas';
import { Message, Role } from '@/utils/Interfaces';
import { FlashList } from '@shopify/flash-list'
import ChatMessage from '@/components/ChatMessage';
import { useMMKVString } from 'react-native-mmkv';
import { Storage } from '@/utils/Storage';

const DUMMY_MESSAGES: Message[] = [
  { content: 'hello, whats good', role: Role.Bot },
  { content: 'not much, just chillin, thksldjlfkjasldkfjalksjdfalsdfalksdjfl;kajsd;lfkja;lsdjkf  aslkdfjlkj d,l d flkdjfl kjflkajsldkf jalksdjflkasjdf ', role: Role.User },
  { content: 'what do you want to talk about?', role: Role.Bot },
]
const Page = () => {
  const { signOut } = useAuth();
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES);
  const [height, setHeight] = useState(0);

  const [key, setKey] = useMMKVString('apiKey', Storage)
  const [organization, setOrganization] = useMMKVString('org', Storage)
  const [gptVersion, setGptVersion] = useMMKVString('gptVersion', Storage)

  if (!key || key === '' || !organization || organization === '') {
    return <Redirect href={"/(auth)/(modal)/settings"} />
  }


  const getCompletion = (message: string) => {
    console.log('get completion for message: ', message);
  }

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    console.log('height', height);
    setHeight(height);
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
      <View style={{ flex: 1}} onLayout={onLayout}>
        {messages.length === 0 && (
          <View style={[styles.logoContainer, { marginTop: height / 2 - 100}]}>
            <Image source={require('@/assets/images/logo-dark.png')} style={styles.image}/>
          </View>
        )}
        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          contentContainerStyle={{ paddingTop: 30, paddingBottom: 150 }}
          keyboardDismissMode="on-drag"
        />
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
        {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion} />}
        <MessageInput onShouldSendMessage={getCompletion}/>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 40,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  }
})

export default Page