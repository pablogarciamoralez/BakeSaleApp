import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ajax from "../BakeSaleApp/src/Components/ajax";
import DealDetail from "./src/Components/DealDetail";
import DealList from "./src/Components/DealList";

export default class App extends React.Component {
  state = {
    deals: [],
    currentDealId: null,
  };

  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals });
  }

  setCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: dealId,
    });
  };

  unSetCurrentDeal = () => {
    this.setState({
      currentDealId: null,
    });
  };

  currentDeal = () => {
    return this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId
    );
  };

  render() {
    if (this.state.currentDealId) {
      return (
        <DealDetail
          initialDealData={this.currentDeal()}
          onBack={this.unSetCurrentDeal}
        />
      );
    }

    if (this.state.deals.length > 0) {
      return (
        <DealList deals={this.state.deals} onItemPress={this.setCurrentDeal} />
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Bakesale</Text>
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
