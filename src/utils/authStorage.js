import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const authToken = await AsyncStorage.getItem(`${this.namespace}`)

    return authToken ? JSON.parse(authToken) : ''
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}`, JSON.stringify(accessToken))
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}`)
  }
}

export default AuthStorage;