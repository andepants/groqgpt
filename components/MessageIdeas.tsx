import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';

const PredefinedMessages = [
  { title: 'Explain why we need water to survive', text: "Like I'm five years old" },
  { title: 'Explain why the sky is blue', text: "Like I'm five years old" },
  { title: 'Explain why we need to brush our teeth', text: "Like I'm five years old" },
];

type Props = {
  onSelectCard: (message: string) => void;
}

const MessageIdeas = ({ onSelectCard } : Props) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          gap: 16,
        }}
      >
        {PredefinedMessages.map((message, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectCard(`${message.title} ${message.text}`)}
            style={styles.card}
          >
            <Text style={{ fontSize: 16, fontWeight: "500"}}>{message.title}</Text>
            <Text style={{ fontSize: 16, color: Colors.grey}}>{message.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.input,
    padding: 10,
    borderRadius: 10,
  }
})
export default MessageIdeas