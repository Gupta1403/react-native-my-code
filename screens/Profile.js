import React, { } from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons, Entypo } from '@expo/vector-icons';


const Profile = (props) => {

    const openDial = (contactNo) =>{
        let str = ''
        Platform.OS === 'android'? str += 'tel:' + contactNo : str += 'telprompt:' + contactNo
        Linking.openURL(str)
    }   
    // console.log(props)
    //Accessing params passed during navigation -> props.route.params.<<key_name>>
    const { email, salary, phone, name, position, uri } = props.route.params.item; 
    return (
        <View style={styles.root}>
            <LinearGradient
                colors={["#1976d2", "#6bc1ff"]}
                style={{ height: "20%" }}
            />
                {/* Image */}
            <View style={{ alignItems: 'center' }}>
                <Image style={{ width: 140, height: 140, borderRadius: 45, marginTop: -50}}
                    source={{ uri: uri }} />
            </View>
                {/* Name and designation */}
            <View style={{alignItems : "center", margin : 15}}>
                <Title>{name}</Title>
                <Text>{position}</Text>
            </View>
                {/* Other details in Card */}
            <Card style={styles.myCard} onPress={() => Linking.openURL("mailto:" + email)}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="email" size={32} color="#1976d2" />
                    <Text style={styles.myText}>{email}</Text>
                </View>
            </Card>
            <Card style={styles.myCard} onPress={() =>openDial(phone)}>
                <View style={styles.cardContent}>
                    <Entypo name="phone" size={32} color="#1976d2" />
                    <Text style={styles.myText}>{phone}</Text>
                </View>
            </Card>
            <Card style={styles.myCard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="attach-money" size={32} color="#1976d2" />
                    <Text style={styles.myText}>{salary}</Text>
                </View>
            </Card>
                {/* Buttons */}
            <View style={{ flexDirection: "row", justifyContent: "space-around", padding : 10}}>
                <Button icon="account-edit" mode="contained" onPress={() => console.log("Pressed")} theme={theme}>
                    Edit
                </Button>
                <Button icon="delete" mode="contained" onPress={() => console.log("Pressed")} theme={theme}>
                    Fire Employee
                </Button>
            </View>
        </View>
    )
}

export default Profile

const theme = { colors: { primary: "#1976d2" } }

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    myCard :{
        margin : 2,
    },
    cardContent :{
        flexDirection : "row",
        padding : 8
    },
    myText : {
        fontSize : 18,
        marginTop : 3,
        marginLeft : 5
    }
})