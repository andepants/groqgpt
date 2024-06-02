import { View, Text, Button, Platform, KeyboardAvoidingView, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import HeaderDropDown from '@/components/HeaderDropDown';
import MessageInput from '@/components/MessageInput';
import MessageIdeas from '@/components/MessageIdeas';
import { FlashList } from '@shopify/flash-list'
import ChatMessage from '@/components/ChatMessage';
import { useMMKVString } from 'react-native-mmkv';
import { Storage } from '@/utils/Storage';
import Groq from 'groq-sdk';
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions';
import { useSQLiteContext } from 'expo-sqlite';
import { addChat, addMessage, getMessages } from '@/utils/Database';
import { Message } from '@/utils/Interfaces';

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;

const ChatPage = () => {
  const { signOut } = useAuth();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [height, setHeight] = useState(0);

  const [key, setKey] = useMMKVString('apiKey', Storage)
  const [organization, setOrganization] = useMMKVString('org', Storage)
  const [gptVersion, setGptVersion] = useMMKVString('gptVersion', Storage)

  const { id } = useLocalSearchParams<{id: string}>();
  const db = useSQLiteContext();
  const [chatId, setChatId] = useState<string | undefined>(id);

  const groq = new Groq({
    apiKey: GROQ_API_KEY,
  });

  // if (!key || key === '' || !organization || organization === '') {
  //   return <Redirect href={"/(auth)/(modal)/settings"} />
  // }

  useEffect(() => {
    if (id) {
      // console.log('Load for Chat ID: ', id);
      getMessages(db, parseInt(id)).then((messages) => {
        // console.log('got messages: ', messages);
        setMessages(messages);
      })
    }
  }, [id])

  const getCompletion = async (message: string) => {
    // console.log('get completion for message: ', message);
    let chatID = chatId;

    if ( messages.length === 0) {
      const result = await addChat(db, message);
      chatID = result.lastInsertRowId.toString();
      setChatId(chatID);
      // console.log('chatID: ', chatID);
    }
    addMessage(db, Number(chatID), { content: message, role: 'user' })

    const inputMessages: any = [
      ...messages,
      { role: 'user', content: message },
    ]
    const tempGroqMessages = inputMessages.map((message: any) => {
      const { role, content } = message;
      return {
        role, content
      }
    });
    const groqResponse = await groq.chat.completions.create({
      messages: tempGroqMessages,
      model: gptVersion === 'llama3-8b' ? 'llama3-8b-8192' :
      gptVersion === 'llama3-70b' ? 'llama3-70b-8192' :
      gptVersion === 'mixtral-8x7b' ? 'mixtral-8x7b-32768' :
      gptVersion === 'gemma-7b' ? 'gemma-7b-it' : 'llama3-8b-8192',
    })
    addMessage(db, Number(chatID), { content: groqResponse.choices[0]?.message?.content, role: 'assistant' })

    setMessages([...inputMessages,
      { role: 'assistant', content: groqResponse.choices[0]?.message?.content}
    ])


  }

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
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
                { key: 'llama3-8b', title: 'llama3-8b', icon: 'hare' },
                { key: 'llama3-70b', title: 'llama3-70b', icon: 'hare.fill' },
                { key: 'mixtral-8x7b', title: 'mixtral-8x7b', icon: 'bolt' },
                { key: 'gemma-7b', title: 'gemma-7b', icon: 'icloud' },
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
          contentContainerStyle={{ paddingTop: 30, paddingBottom: 150, paddingRight: 40 }}
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

export default ChatPage