import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

const NewsItem = ({ title, content, category, description, creator, image_url, keywords, pubDate, navigation }) => {

    const theme = useTheme();

    const handlePress = () => {
        navigation.navigate('NewsOverView', { title: title, content: content, category: category, description: description, creator: creator, keywords: keywords, pubDate: pubDate, image_url: image_url, navigation: navigation })
    }
    return (
        <Pressable onPress={handlePress}>
            <Card style={{ marginVertical: 10, backgroundColor: theme.colors.elevation.level5 }}>

                <Card.Cover borderRadius={1} source={{ uri: image_url }} />
                <Card.Title title={title} subtitle={description.split("\n")[0]} titleNumberOfLines={1} />


            </Card>
        </Pressable>
    )
}

export default NewsItem

const styles = StyleSheet.create({

})