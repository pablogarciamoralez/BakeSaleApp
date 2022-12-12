import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ajax from "../BakeSaleApp/src/Components/ajax";
import DealList from "./src/Components/DealList";

export default class App extends React.Component {
  state = {
    deals: [],
  };

  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals });
    console.log(deals);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.deals.length > 0 ? (
          <DealList deals={this.state.deals}></DealList>
        ) : (
          <Text style={styles.header}>Bakesale</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 40,
  },
});
