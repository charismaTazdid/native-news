import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

const DetailsNews = ({ title, image_url, content }) => {
    const theme = useTheme();
    return (
        <ScrollView>
            <Text style={{ color: "black", marginVertical: 10 }} variant="headlineMedium" >
                {title}
            </Text>

            <Card
                style={{ backgroundColor: theme.colors.background }}
                contentStyle={{ width: Dimensions.get("window").width }}>

                {
                    image_url && (
                        <Card.Cover source={{ uri: image_url }} />)
                }
                <Card.Content>
                    <Text
                        style={{ textAlign: "left", marginVertical: 10, color: "white" }}
                        variant="headlineSmall"
                        textBreakStrategy='highQuality'
                    >
                        {content}
                    </Text>
                </Card.Content>
            </Card>
        </ScrollView>
    )
}

export default DetailsNews

const styles = StyleSheet.create({})