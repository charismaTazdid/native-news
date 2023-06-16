import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import DetailsNews from '../components/DetailsNews';
import { Button } from 'react-native-paper';

//{ title, content, category, description, creator, keywords, pubDate }

const NewsOverview = (props) => {

    const { title, image_url, content, category, description, creator, keywords, pubDate } = props?.route?.params;

    props.navigation.setOptions({ headerRight: () => <Button onPress={()=> alert("AMaree Kheye diche")}>Save</Button> })
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