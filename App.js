import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ajax from "../BakeSaleApp/src/Components/ajax";
import DealDetail from "./src/Components/DealDetail";
import DealList from "./src/Components/DealList";
import SearchBar from "./src/Components/SearchBar";

export default class App extends React.Component {
  state = {
    deals: [],
    dealsFormSearch: [],
    currentDealId: null,
  };

  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals });
  }

  searchDeals = async (searchTerm) => {
    let dealsFormSearch = [];
    if (searchTerm) {
      dealsFormSearch = await ajax.fetchDealsSearchResults(searchTerm);
    }
    this.setState({ dealsFormSearch });
  };

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
        <View style={styles.main}>
          <DealDetail
            initialDealData={this.currentDeal()}
            onBack={this.unSetCurrentDeal}
          />
        </View>
      );
    }
    const dealsToDisplay =
      this.state.dealsFormSearch.length > 0
        ? this.state.dealsFormSearch
        : this.state.deals;

    if (dealsToDisplay.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar searchDeals={this.searchDeals} />
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
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
  main: {
    marginTop: 30,
  },
  header: {
    fontSize: 40,
  },
});
