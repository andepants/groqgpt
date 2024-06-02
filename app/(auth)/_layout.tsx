import React from 'react'
import { Stack, useRouter } from 'expo-router'
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import * as SQLite from 'expo-sqlite';
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { migrateDbIfNeeded } from '@/utils/Database';


const Layout = () => {
  const router = useRouter();
  return (
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
      </Stack>
    </SQLiteProvider>
  );
};

export default Layout;