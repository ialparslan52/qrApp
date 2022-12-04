import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GlobalStyles } from '../constans/styles';
import { getFormattedDate } from "../util/date";

function QrItem({data, type, timestamp,onPress,onLongPress }) {

    return (
            <Pressable style={({pressed}) => pressed && styles.pressed} onPress={onPress} onLongPress={onLongPress}>
                <View style={styles.qrItem}>
                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>Veri: </Text>
                        <Text style={styles.textBase}>{data}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>Tip: </Text>
                        <Text style={styles.textBase}>{type}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>Tarih: </Text>
                        <Text style={styles.textBase}>{getFormattedDate(new Date(timestamp))}</Text>
                    </View>
                </View>
            </Pressable>
    )

}

export default QrItem;

const styles = StyleSheet.create({
    qrItem:{
        padding:12,
        marginVertical:8,
        backgroundColor:GlobalStyles.colors.primary400,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'stretch',
        borderRadius:7,
    },
    pressed:{
        opacity:0.75,
    },
    textContainer:{
        flexDirection:'row',
        marginBottom:4,
    },
    textTitle:{
        color:GlobalStyles.colors.primary50,
        fontSize:16,
        fontWeight:'bold',
    },
    textBase:{
        color:GlobalStyles.colors.primary100,
        fontSize:16,
    },
});