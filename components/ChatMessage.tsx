// @ts-nocheck
import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions';

const ChatMessage = ({ content, role } : ChatCompletionMessageParam) => {
  return (
    <View style={styles.row}>
      {role === 'assistant' ? (
        <View style={[styles.item]}>
          <Image source={require('@/assets/images/logo-dark.png')} style={styles.btnImage} />
        </View>
      ) :
      (
        <Image source={require('@/assets/images/avatar.png')} style={styles.avatar}/>
      )}
      <Text style={styles.content}>{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 14,
    gap: 14,
    marginVertical: 12,
  },
  item: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  btnImage: {
    margin: 6,
    width: 20,
    height: 20,
  },
  content: {
    padding: 4,
  }
})

export default ChatMessage