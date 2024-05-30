import React from 'react'
import { Stack, useRouter } from 'expo-router'
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name='(drawer)' options={{ headerShown: false }} />
      <Stack.Screen
        name="(modal)/settings"
        options={{
          headerTitle: 'Settings',
          presentation: 'modal',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.selected },
          headerLeft: () => (
            <>
              {router.canGoBack() &&
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={{ backgroundColor: Colors.greyLight, borderRadius: 20, padding: 6 }}
                  >
                  <Ionicons name="close-outline" size={24} color={Colors.grey}/>
                </TouchableOpacity>
              }
            </>
          )
        }}
      />
    </Stack>
  );
};

export default Layout;