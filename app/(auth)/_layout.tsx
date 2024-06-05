import React from 'react'
import { Stack, useRouter } from 'expo-router'
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import * as SQLite from 'expo-sqlite';
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { migrateDbIfNeeded } from '@/utils/Database';
import { RevenueCatProvider } from '@/providers/RevenueCatProvider';


const Layout = () => {
  const router = useRouter();
  return (
    <RevenueCatProvider>
      <SQLiteProvider
        databaseName='chats.db'
        onInit={migrateDbIfNeeded}
        >
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
                  {true &&
                    <TouchableOpacity
                      onPress={() => router.push('/(auth)/(drawer)/new')}
                      style={{ borderRadius: 20, padding: 6 }}
                      >
                      <Ionicons name="close-outline" size={28} color={Colors.greyLight}/>
                    </TouchableOpacity>
                  }
                </>
              )
            }}
          />
          <Stack.Screen
            name="(modal)/[url]"
            options={{
              headerTitle: '',
              presentation: 'fullScreenModal',
              headerTransparent: true,
              headerShadowVisible: false,
              headerBlurEffect: 'dark',
              headerStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
              headerLeft: () => (
                <>
                  {router.canGoBack() &&
                    <TouchableOpacity
                    onPress={() => router.back()}
                    style={{ borderRadius: 20, padding: 4 }}
                    >
                      <Ionicons name="close-outline" size={24} color={'#fff'}/>
                    </TouchableOpacity>
                  }
                </>
              )
            }}
          />
        <Stack.Screen
            name="(modal)/purchase"
            options={{
              headerTitle: '',
              presentation: 'fullScreenModal',
              headerShadowVisible: false,
              headerLeft: () => (
                <>
                  {router.canGoBack() &&
                    <TouchableOpacity
                      onPress={() => router.back()}
                      style={{ borderRadius: 20, padding: 6 }}
                      >
                      <Ionicons name="close-outline" size={28} color={Colors.greyLight}/>
                    </TouchableOpacity>
                  }
                </>
              )
            }}
          />
        </Stack>
      </SQLiteProvider>
    </RevenueCatProvider>
  );
};

export default Layout;