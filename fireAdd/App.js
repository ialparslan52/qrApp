import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { firebase } from './Firebase/firebase-config';
import QrList from './components/QrList';
import { GlobalStyles } from './constans/styles';

export default function App() {


  //firebase collection ref
  const qrDataRef = firebase.firestore().collection('qrData');

  // add data to firebase
  const addField = ({ type, data }) => {

    setScanned(true);
    setText("Scanned");

    const qrData = {
      qrcode: data,
      type: type,
      createdAt: (new Date()).toString(),
    };

    qrDataRef
      .add(qrData)
      .catch((error) => {
        console.log("error..:" + error);
      })
  }



  //permissions

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not Yet Scanned');


  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }



  //request camera permission

  useEffect(() => {
    askForCameraPermission();
  }, []);




  //check permissions and return the screens

  if (hasPermission === null) {
    return (
      <View style={[styles.container, { alignItems: 'center' }]}>
        <Text style={styles.maintext}>Requesting for camera permission</Text>
      </View>
    )
  }


  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => { askForCameraPermission }} />
        <Button title='getData' onPress={getData} />
      </View>
    )
  }


  //return the view

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.barcodebox}>
          <BarCodeScanner onBarCodeScanned={scanned ? undefined : addField} style={StyleSheet.absoluteFillObject} />
        </View>
        <Text style={styles.maintext}>{text}</Text>
        {scanned && <Button title='Scan Again' onPress={() => { setScanned(false); setText('Not Yet Scanned') }} color='tomato' />}
      </View>
      <View style={styles.listContainer}>
        <QrList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  barcodebox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  listContainer: {
    flex: 6,
    paddingHorizontal: 30,
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  maintext: {
    color: GlobalStyles.colors.primary50,
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  }
});
