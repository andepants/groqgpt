import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions, TextInput } from 'react-native'
import React from 'react'
import Drawer from 'expo-router/drawer'
import { Link, useNavigation } from 'expo-router'
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { DrawerActions } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'


export const CustomDrawerContent = ( props: any ) => {
  const { bottom, top } = useSafeAreaInsets();
  return (
    <View style={{flex: 1, marginTop: top}}>
      <View style={{backgroundColor: '#fff', paddingBottom: 16}}>
        <View style={styles.searchSection}>
          <Ionicons style={styles.searchIcon} name='search' size={20} color={Colors.grey} />
          <TextInput placeholder='search' underlineColorAndroid={'transparent'} style={styles.input}/>
        </View>
      </View>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={{  padding: 16, paddingBottom: bottom }}>
        <Link href='/(auth)/(modal)/settings' asChild>
          <TouchableOpacity style={styles.footer}>
            <Image
              source={require('@/assets/images/avatar.png')}
              style={styles.avatar}
            />
            <Text style={styles.userName}>Big Daddy</Text>
            <Ionicons name='ellipsis-horizontal' size={24} color={Colors.greyLight} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

const Layout = () => {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{ marginLeft: 16}}
          >
            <FontAwesome6 name='grip-lines' size={20} color={Colors.grey} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: Colors.light,
        },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: Colors.selected,
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#000',
        overlayColor: 'rgba(0,0,0,0.2)',
        drawerItemStyle: { borderRadius: 12 },
        drawerLabelStyle: { marginLeft: -16 },
        drawerStyle: { width: dimensions.width * 0.86 },
      }}
    >
      <Drawer.Screen
        name='(chat)/new'
        getId={() => Math.random().toString()}
        options={{
          title: 'groqGPT',
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: '#000' }]}>
              <Image
                source={require('@/assets/images/logo-dark.png')}
                style={styles.btnImage}
              />
            </View>
          ),
          headerRight: () => (
            <Link href='/(auth)/(drawer)/(chat)/new' push asChild>
              <Ionicons
                name='create-outline'
                size={24}
                color={Colors.grey}
                style={{ marginRight: 16 }}
              />
            </Link>
          )
        }}
      />

      <Drawer.Screen
        name='dalle'
        options={{
          title: 'DALL·E',
          drawerIcon: () => (
            <View style={styles.itemDalli}>
              <Image
                source={require('@/assets/images/dalle.png')}
                style={styles.btnImage}
              />
            </View>
          ),
        }}
      />

      {/* <Drawer.Screen
        name='explore'
        options={{
          title: 'Explore GPTs',
          drawerIcon: () => (
            <View style={[styles.itemExplore]}>
              <Ionicons name='apps-outline' size={18} color={'#000'} />
            </View>
          ),
        }}
      /> */}
    </Drawer>
  )
}

const styles = StyleSheet.create({
  item: {
    overflow: 'hidden',
    borderRadius: 15,
  },
  btnImage: {
    height: 20,
    width: 20,
    margin: 2,
  },
  itemDalli: {
    backgroundColor: '#fff',
    width: 24,
    height: 24,
    objectFit: 'cover',
  },
  itemExplore: {
    backgroundColor: '#fff',
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSection: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.input,
    borderRadius: 10,
    height: 34,
  },
  searchIcon: {
    padding: 6,
  },
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    alignItems: 'center',
    color: '#424242',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  }
})

export default Layout