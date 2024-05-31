import ChatMessage from '@/components/ChatMessage';
import HeaderDropDown from '@/components/HeaderDropDown';
import MessageInput from '@/components/MessageInput';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Message, Role } from '@/utils/Interfaces';
import { Storage } from '@/utils/Storage';
import { FlashList } from '@shopify/flash-list';
import { Redirect, Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, View, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useMMKVString } from 'react-native-mmkv';
import OpenAI from 'openai';

const dummyMessages = [
  {
    role: 'assistant',
    content: '',
    imageUrl: 'https://galaxies.dev/img/meerkat_2.jpg',
    prompt:
      'A meerkat astronaut in a futuristic spacesuit, standing upright on a rocky, alien landscape resembling the surface of Mars. The spacesuit is highly detailed with reflective visor and intricate life-support systems. The background shows a distant starry sky and a small Earth visible in the far horizon. The meerkat looks curious and brave, embodying the spirit of exploration.',
  }
];

const Page = () => {
  const [height, setHeight] = useState(0);
  const [key, setKey] = useMMKVString('apikey', Storage);
  const [organization, setOrganization] = useMMKVString('org', Storage);
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [working, setWorking] = useState(false);

  if (!key || key === '' || !organization || organization === '') {
    return <Redirect href={'/(auth)/(modal)/settings'} />;
  }

  const openAI = useMemo(
    () =>
      new OpenAI({
        project: 'proj_Llk0U1Qr634L2XqJyct1KmF7',
        organization: 'org-NbHRVac2tHUeFH2hUZ5pbZPq',
        apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
      }),
    []
  );

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height / 2);
  };

  const getCompletion = async (text: string) => {
    setWorking(true);
    setMessages([...messages, { role: 'user', content: text }]);

    const result = await openAI.images.generate({
      prompt: text,
      model: 'dall-e-2',
    });
    if (result.data && result.data.length > 0) {
      const imageUrl = result.data[0].url;
      setMessages((prev) => [...prev, { role: 'assistant', content: '', imageUrl, prompt: text }]);
    }
    setWorking(false);
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropDown
              title="Dall·E"
              items={[
                { key: 'share', title: 'Share GPT', icon: 'square.and.arrow.up' },
                { key: 'details', title: 'See Details', icon: 'info.circle' },
                { key: 'keep', title: 'Keep in Sidebar', icon: 'pin' },
              ]}
              onSelect={() => {}}
            />
          ),
        }}
      />
      <View style={styles.page} onLayout={onLayout}>
        {messages.length == 0 && (
          <View style={[{ marginTop: height / 2 - 100, alignItems: 'center', gap: 16 }]}>
            <View style={styles.logoContainer}>
              <Image source={require('@/assets/images/dalle.png')} style={styles.image} />
            </View>
            <Text style={styles.label}>Let me turn your imagination into imagery.</Text>
          </View>
        )}
        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          contentContainerStyle={{ paddingTop: 30, paddingBottom: 150 }}
          keyboardDismissMode="on-drag"
          ListFooterComponent={
            <>{working && <ChatMessage {...{ role: 'assistant', content: '', loading: true }} />}</>
          }
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
        }}>
        <MessageInput onShouldSendMessage={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#000',
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.greyLight,
  },
  image: {
    resizeMode: 'cover',
  },
  page: {
    flex: 1,
  },
  label: {
    color: Colors.grey,
    fontSize: 16,
  },
});
export default Page;