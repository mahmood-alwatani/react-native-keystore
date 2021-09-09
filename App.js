/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import SInfo from 'react-native-sensitive-info';
import EncryptedStorage from 'react-native-encrypted-storage';
import SharedPreferences from 'react-native-shared-preferences';
import DefaultPreference from 'react-native-default-preference';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const keys = ['key1', 'key2', 'key3', 'key4'];

  keys.forEach(key => {
    DefaultPreference.get(key).then(function (value) {
      console.log(`Default Pref key: ${key} value: ${value}`);
    });

    SInfo.getItem(key, {
      sharedPreferencesName: 'instance1',
      keychainService: 'myKeychain',
    }).then(item => console.log(`SInfo key: ${key} value: ${item}`));

    RNSecureKeyStore.get(key).then(
      res => {
        console.log(`RNSKS key: ${key} value: ${res}`);
      },
      err => {
        console.log(err);
      },
    );

    EncryptedStorage.getItem(key).then(value =>
      console.log(`ES key: ${key} value: ${value}`),
    );

    SharedPreferences.getItem(key, function (value) {
      console.log(`Shared Pref: ${key} value: ${value}`);
    });
  });

  // async function retrieveUserSession() {
  //   try {
  //     const session = await EncryptedStorage.getItem('myKey');

  //     if (session !== undefined) {
  //       console.log(session);
  //       Alert.alert(session);
  //     }
  //   } catch (error) {
  //     // There was an error on the native side
  //   }
  // }

  // retrieveUserSession();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
