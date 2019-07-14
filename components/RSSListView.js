import React from "react";
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, Linking, Share } from "react-native";

export default class RSSListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      feed: this.props.feed
    };
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <FlatList
          data={this.state.feed}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => Linking.openURL(item.link)}
              onLongPress={() =>
                Share.share(
                  {
                    message: "Schau mal was ich gelesen habe.",
                    url: item.link,
                    title: item.title
                  },
                  {
                    // Android only:
                    dialogTitle: item.title
                  }
                )
              }
            >
              <View style={styles.container}>
                <Image source={{ uri: item.thumbnail }} style={styles.photo} />
                <View style={styles.container_text}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.pubDate}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 0
  },
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    marginBottom: 3,
    borderRadius: 1,
    backgroundColor: "#cecece",
    elevation: 2
  },
  title: {
    fontSize: 16,
    color: "#000"
  },
  container_text: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
    justifyContent: "center"
  },
  description: {
    fontSize: 11,
    fontStyle: "italic"
  },
  photo: {
    height: 50,
    width: 50
  }
});
