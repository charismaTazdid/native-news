import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, ScrollView, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import NewsItem from '../components/NewsItem';

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
  const filterdData = savedData.filter((news) => news.title !== value)
  try {
    const jsonValue = JSON.stringify(filterdData);
    await AsyncStorage.setItem('@savedNews', jsonValue)
    alert("Deleted Successfully")
  } catch (error) {
    return alert("Something Went Wrong with Saving this")
  }
};


const Saved = (props) => {

  const [savedNews, setSavedNews] = useState([]);
  const focused = useIsFocused();

  const handleDelete = async (title) => {
    await storeData(title)
  };

  useEffect(() => {
    getData().then((data) => setSavedNews(data))
      .catch((err) => alert("Something Wrong, Please Check Later"))
  }, [focused, handleDelete]);



  return (
    <ScrollView>
      <View style={styles.contianer}>
        <Appbar.Header>
          <Appbar.Content title="SAVEDCONTENT">

          </Appbar.Content>
        </Appbar.Header>

        <FlatList
          style={styles.flatList}
          keyExtractor={(item) => item.title}
          data={savedNews}
          renderItem={({ item }) => (
            <NewsItem
              navigation={props.navigation}
              content={item.content}
              description={item.description || ""}
              image_url={item.image_url}
              title={item.title}
              handleDelete={handleDelete}

            />)}
        />
      </View>
    </ScrollView>
  )
}

export default Saved;

const styles = StyleSheet.create({
  flatList: {
    display: "flex",
    flex: 1,
    height: 'auto',
  },
  contianer: {
    flex: 1,
  }
})