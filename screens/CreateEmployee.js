import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert } from 'react-native';
import { TextInput, Button } from "react-native-paper";

import * as ImagePicker from "expo-image-picker"; //To access the images
import * as Permissions from "expo-permissions"; //To get the permissions of device to access the device data

const CreateEmployee = () => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [salary, setSalary] = useState("")
    const [picture, setPicture] = useState("")
    const [modal, setModal] = useState(false)


    const pickFromGallery = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (granted) {
            const data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            });
            // console.log(data)            
            if (!data.cancelled) {
                //image = { uri : url_of_image, type: type_of_image(png/jpef), name: <<random_name>>.(jpeg/png)  }
                const image = { uri: data.uri, type: `test/${data.uri.split('.')[1]}`, name: `test.${data.uri.split('.')[1]}` } //Has to pass the data through fetch in this format
                handleUpload(image)
            }
        } else {
            Alert.alert("You need to provide permissions to work");
        }
    }

    const pickFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA);
        if (granted) {
            const data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            });
            // console.log(data)            
            if (!data.cancelled) {
                //image = { uri : url_of_image, type: type_of_image(png/jpef), name: <<random_name>>.(jpeg/png)  }
                const image = { uri: data.uri, type: `test/${data.uri.split('.')[1]}`, name: `test.${data.uri.split('.')[1]}` } //Has to pass the data through fetch in this format
                handleUpload(image)
            }
        } else {
            Alert.alert("You need to provide permissions to access ")
        }
    }

    const handleUpload = (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", 'employeeApp'); //Preset name given in cloudinary website
        formData.append("cloud_name", 'sai007'); //Cloud name given in cloudinary website
        //url -> https://api.cloudinary.com/v1_1/<<cloud_name>>/image/upload
        fetch('https://api.cloudinary.com/v1_1/sai007/image/upload', {
            method: "post",
            body: formData
        }).then(res => res.json()) //Converting the res to json format
          .then(data => {
              console.log(data);
              setPicture(data.url);
              setModal(false)//closing the modal once the image is uploaded
            })
    }

    return (
        <View style={styles.root}>
            {/* Name */}
            <TextInput
                label={"Name"} style={styles.inputStyle}
                theme={theme} mode={"outlined"}
                value={name} onChangeText={text => setName(text)} //Inbuilt
            // onChange = {({target}) => setName(target.value)}
            />
            {/* Email */}
            <TextInput
                label={"Email"} style={styles.inputStyle}
                theme={theme} mode={"outlined"}
                value={email} onChangeText={text => setEmail(text)}
            />
            {/* Phone */}
            <TextInput
                label={"Phone Number"} style={styles.inputStyle}
                theme={theme} mode={"outlined"}
                value={phone} onChangeText={text => setPhone(text)}
                keyboardType='number-pad'
            />
            {/* Salary */}
            <TextInput
                label={"Salary"} style={styles.inputStyle}
                theme={theme} mode={"outlined"}
                value={salary} onChangeText={text => setSalary(text)}
            // keyboardType='number-pad'
            />

            {/* Upload Button */}
            <Button 
                icon={ picture ? "check" : "upload"} 
                mode="contained" onPress={() => setModal(true)} style={styles.inputStyle} theme={theme}>
                Upload Image
            </Button>
            {/* Save Button */}
            <Button icon="content-save" mode="contained" onPress={() => console.log("Save")} style={styles.inputStyle} theme={theme}>
                Save
            </Button>

            {/* Modal -  Popup */}
            <Modal
                animationType="fade" transparent={true}
                visible={modal} onRequestClose={() => setModal(false)} //invokes when uesr clicks back button in mobile
            >
                <View style={styles.modalView}>
                    {/* Side by side buttons */}
                    <View style={styles.modalButtonView}>
                        <Button icon="camera" mode="contained" onPress={() => pickFromCamera()} theme={theme}>
                            Camera
                        </Button>
                        <Button icon="image-area" mode="contained" onPress={() => pickFromGallery()} theme={theme}>
                            Gallery
                        </Button>
                    </View>
                    {/* One fully occupied Button */}
                    <Button onPress={() => setModal(false)} theme={theme}>
                        Cancel
                </Button>
                </View>
            </Modal>
        </View>
    )
};

export default CreateEmployee;

const theme = { colors: { primary: "#1976d2" } }

const styles = StyleSheet.create({
    root: {
        flex: 1, //To occupy the entire screen height
    },
    inputStyle: {
        margin: 5
    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "white"
    }
})