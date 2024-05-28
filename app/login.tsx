import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { defaultStyles } from '../constants/Styles'
import Colors from '../constants/Colors'

const Page = () => {
  const { type } = useLocalSearchParams<{type: string}>();
  const [loading, setLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPress = async () = {};
  const onSignInPress = async () = {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={1}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size='large' color='#fff'/>
        </View>
      )}
      <Image style={styles.logo} source={require('../assets/images/logo-white.png')} />

      <Text style={styles.title}>
        {type === 'login' ? 'Welcome back' : 'Create your account'}
      </Text>

      <View style={{marginBottom: 20 }}>
        <TextInput
          autoCapitalize='none'
          placeholder='Email'
          style={styles.inputField}
          value={emailAddress}
          onChangeText={setEmailAddress}
        />
        <TextInput
          autoCapitalize='none'
          placeholder='Password'
          style={styles.inputField}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {type === 'login' ? (
        <TouchableOpacity onPress={onSignInPress} style={[defaultStyles.btn, styles.btnPrimary]}>
          <Text style={styles.btnPrimaryText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onSignUpPress} style={[defaultStyles.btn, styles.btnPrimary]}>
          <Text style={styles.btnPrimaryText}>Create acount</Text>
        </TouchableOpacity>
      )}

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginVertical: 80,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
  }
})

export default Page;