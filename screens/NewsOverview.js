import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import DetailsNews from '../components/DetailsNews';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// GET and SAVE news to localstorage which AsyncStorage
const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@savedNews');
        if (value !== null) {
            return JSON.parse(value)
        }
    } catch (error) {
        alert("Something Wrong. Try Later...")
        return;
    }
};

const storeData = async (value) => {
    const savedData = await getData() || [];
    !savedData.find((d) => d.title === value.title) ? savedData.push(value) : savedData;
    try {
        const jsonValue = JSON.stringify(savedData);
        await AsyncStorage.setItem('@savedNews', jsonValue)
        alert("Saved Successfully")
    } catch (error) {
        return alert("Something Went Wrong with Saving this")
    }
};



const NewsOverview = (props) => {

    const { title, image_url, content, category, description, creator, keywords, pubDate } = props?.route?.params;

    props.navigation.setOptions({
        headerRight: () => <Button onPress={() => storeData({ title, content, image_url })}>Save</Button>
    })
    return (

        <DetailsNews
            title={title}
            image_url={image_url}
            content={content}
        >
        </DetailsNews>
    )
}

export default NewsOverview;

const styles = StyleSheet.create({})