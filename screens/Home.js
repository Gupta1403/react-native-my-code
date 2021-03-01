import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Card, FAB } from "react-native-paper";


const Home = (props) => {

    const data = [
        { id: "1", email: "Employee1@gmail.com", salary: "4 LPA", phone: '123456789', name: "Chebolu Saiguptha", position: "Web Developer", uri: "https://instagram.fvtz1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/77030885_455214791833766_2624159244726829056_n.jpg?_nc_ht=instagram.fvtz1-1.fna.fbcdn.net&_nc_ohc=FwvxjKP-rAoAX-ihKF4&oh=42adc1adfa8ea59e03f7842920633c10&oe=5F02D28F" },
        { id: "2", email: "Employee2@gmail.com", salary: "4 LPA", phone: '123456789', name: "Mohit Bhardwaj", position: "ML expert", uri: "https://instagram.fvtz1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/83345092_209255573809291_4999349246873305088_n.jpg?_nc_ht=instagram.fvtz1-1.fna.fbcdn.net&_nc_ohc=rrWz7tzyDCIAX-nNhFf&oh=1f26767f6f377f08ccb359467cd340b7&oe=5F02D4FD" },
        { id: "3", email: "Employee3@gamil.com", salary: "4.5 LPA", phone: '123456789', name: "Kunal Tiwari", position: "Android Developer", uri: "https://instagram.fvtz1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/82507383_178697696706355_5242303340510969856_n.jpg?_nc_ht=instagram.fvtz1-1.fna.fbcdn.net&_nc_ohc=7gsG2DbGpvoAX_EvoZJ&oh=2c892dfa7d939ccca1b9a07d03aa8a66&oe=5F03F8DF" },
        { id: "4", email: "Employee4@gmail.com", salary: "4 LPA", phone: '123456789', name: "Ezhilan Veluchami", position: "Web Designer", uri: "https://scontent.fvtz1-1.fna.fbcdn.net/v/t31.0-8/p960x960/17545540_628475990685736_3552474935734425446_o.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=NjlGwos8MFEAX-E02Me&_nc_ht=scontent.fvtz1-1.fna&_nc_tp=6&oh=9045c1c454ab3b1d5739441d97e25f5e&oe=5EFE2D62" }
    ]

    const { navigation } = props;

    const renderList = (item) => {
        return (
            <Card style={styles.myCard} key={item.id}
                onPress={() => navigation.navigate("Profile", { item: item })}
            >
                {/* Used to View because flex direction(to align image and text) is not working in Card(Library component) directly */}
                <View style={styles.cardView}>
                    <Image
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                        // source={{ uri: `https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60` }}
                        //source = {{uri : "./assets/icon.png"}} // Need to know how to use local files for expo view
                        source={{ uri: item.uri }}
                    />
                    {/* By using the below view, i am stoping from applying the flex-direction : row on below 2 text components */}
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text >{item.position}</Text>
                    </View>
                </View>
            </Card>)
    }

    return (
        // Flex : 1 so that the screen takes the whole height and FAB will be moved to the end
        <View style={{ flex: 1 }}>
            {/* {data.map(_ => renderList(_)) } */}

            {/* To iterate over a large set of data, we use flatlist instead of map to increase performane */}
            <FlatList
                data={data}
                renderItem={(dataWithExtra) => {
                    // console.log(dataWithExtra) // each object will be inside the key item of dataWithExtra
                    return renderList(dataWithExtra.item)
                }}
                keyExtractor={(items, index) => String(index)}
            />
            {/* Floating action Button */}
            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{ colors: { accent: "#1976d2" } }}
                onPress={() => navigation.navigate('Create')}//Navigates to Create name when presses
            />
        </View>
    );
}

export default Home

// StyleSheet.create is not meant for styling. Give suggestion of css properties in error if invalid value is given to css attribute
const styles = StyleSheet.create({
    myCard: {
        margin: 5,
    },
    cardView: {
        flexDirection: "row",
        padding: 6
    },
    text: {
        fontSize: 18,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
})
