// @ts-nocheck
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions';
import { Message } from '@/utils/Interfaces'
import Colors from '@/constants/Colors'

const ChatMessage = ({ content, role, loading, imageUrl } : ChatCompletionMessageParam | Message) => {
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
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={Colors.primary} size="small"/>
        </View>
      ) : (
        <>
          {content === '' && imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.previewImage} />
          ) : (
            <Text style={styles.content}>{content}</Text>
          )}
        </>
      )}
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
  },
  loading: {
    justifyContent: 'center',
    height: 26,
    margin: 14,
  },
  previewImage: {
    width: 240,
    height: 240,
    borderRadius: 10,
  }
})

export default ChatMessage