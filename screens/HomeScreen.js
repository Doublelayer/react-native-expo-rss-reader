import React from "react";
import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import RSSListView from "../components/RSSListView";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null
    };
  }

  async componentWillMount() {
    return fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fbahnblogstelle.net%2Ffeed%2F")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.items
        });
      })
      .catch(err => {
        console.log("fetch", err);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      let items = this.state.dataSource.map((val, key) => {
        return (
          <View key={key} style={styles.item}>
            <Text>{val.title}</Text>
            <Image source={{ uri: val.enclosure.thumbnail }} style={{ width: 70, height: 70 }} />
          </View>
        );
      });

      return (
        <View style={styles.container}>
          <RSSListView feed={this.state.dataSource} />
        </View>
      );
    }
  }
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#484848"
  }
});
