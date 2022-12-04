import { FlatList, StyleSheet, Linking, Alert } from 'react-native';
import QrItem from './QrItem';
import { firebase } from '../Firebase/firebase-config';
import React, { useState, useEffect } from 'react';



const QrList = () => {


    const [snapData, setSnapData] = useState([]);
    const qrDataRef = firebase.firestore().collection('qrData');


    // go to qr link from list item.
    goToQrLink = (url) => {
        const supported = Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }


    deleteQrItem = (text) => {
        qrDataRef.doc(text).delete().then(() => {
            Alert.alert("Document successfully deleted!");
        }).catch((error) => {
            Alert.alert("Error removing document: ", error);
        });
    }






    useEffect(async () => {
        qrDataRef.onSnapshot(
            querySnapshot => {
                const dataFromFB = []
                querySnapshot.forEach((doc) => {
                    const { createdAt, qrcode, type } = doc.data();
                    dataFromFB.push({
                        id: doc.id,
                        createdAt,
                        qrcode,
                        type,
                    })
                })
                // sort by Date
                setSnapData(dataFromFB.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)));
            }
        )
    }, [])


    function renderQrItem(itemData) {
        return <QrItem data={itemData.item.qrcode} type={itemData.item.type} timestamp={itemData.item.createdAt} onPress={() => this.goToQrLink(itemData.item.qrcode)} onLongPress={() => this.deleteQrItem(itemData.item.id)} />
    }
    return (
        <FlatList
            data={snapData}
            renderItem={renderQrItem}
        />
    );



}


export default QrList;

const styles = StyleSheet.create({
    whileDeleting: {
        backgroundColor: 'red',
    }
});