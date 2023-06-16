import React, { useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Appbar, Button, Chip, useTheme } from 'react-native-paper';
import NewsItem from '../components/NewsItem';

const categories = ["Technology", "Sports", "Politics", "Business", "Health"];
// const url = "https://newsdata.io/api/1/news?apikey=pub_24595f40e11e57ecedd4c202382e947b9628a&q=bbc&category=entertainment";
// const apiKey = "pub_24595f40e11e57ecedd4c202382e947b9628a";

const Home = (props) => {
    const [newsData, setNewsData] = useState([])
    const [selectedCategoris, setSelectedCategories] = useState([]);
    const [nextPage, setNextPage] = useState("");

    const handleSelectCategory = (category) => {
        setSelectedCategories(
            (previousCategories) => previousCategories.find(ctg => ctg === category) ? previousCategories.filter((ct) => ct !== category) :
                [...previousCategories, category]
        )
    };

    const handlePress = async () => {
        const url = `https://newsdata.io/api/1/news?apikey=pub_24595f40e11e57ecedd4c202382e947b9628a&country=us&language=en${selectedCategoris.length > 0 ? `&category=${selectedCategoris.join()}` : ""}${nextPage?.length > 0 ? `&page=${nextPage}` : ''}  `;

        try {
            await fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setNewsData((prev) => [...prev, ...data.results])
                    setNextPage(data.nextPage)
                })

        } catch (error) {
            console.log(error)
        }

    };
    // console.log(Object.keys(newsData[0]))
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="HOOOOM">

                </Appbar.Content>
            </Appbar.Header>

            {/* Chip Container */}
            <View style={styles.filterContainer}>
                {
                    categories.map((category) => (
                        <Chip
                            mode='outlined'
                            style={styles.chipItem}
                            textStyle={{ fontWeight: "400", color: "white", padding: 1.5 }}
                            key={category}
                            onPress={() => handleSelectCategory(category)}
                            selected={selectedCategoris.find((c) => category === c) ? true : false}
                        >

                            {category}
                        </Chip>
                    ))
                }
                <Button
                    icon={"sync"}
                    mode='contained'
                    labelStyle={{ fontSize: 15, margin: "auto" }}
                    style={styles.reloadBtn}
                    onPress={() => handlePress()}
                >
                    Reload
                </Button>
            </View>
            {/* Chip Container End*/}

            <FlatList
                style={styles.flatList}
                onEndReached={() => handlePress()}
                data={newsData}
                renderItem={({ item }) => (
                    <NewsItem
                        navigation={props.navigation}
                        category={item.category}
                        content={item.content}
                        description={item.description}
                        creator={item.creator}
                        image_url={item.image_url}
                        keywords={item.keywords}
                        pubDate={item.pubDate}
                        title={item.title}
              
                    />)}
            />

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filterContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 10,
        justifyContent: "center"
    },
    chipItem: {
        marginHorizontal: 5,
        marginVertical: 5,
    },
    reloadBtn: {
        maxWidth: 400,
        maxHeight: 40,
        padding: 0,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    flatList: {
        flex: 1,
        height: 'auto',
        // marginHorizontal: 10,
        // marginVertical: 10
    }

})