import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Proptypes from "prop-types";
import DealItem from "./DealItem";

export default class DealList extends React.Component {
  static propTypes = {
    deals: Proptypes.array.isRequired,
  };
  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.deals}
          renderItem={({ item }) => <DealItem deal={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#eee",
    flex: 1,
    width: "100%",
    paddingTop: 50,
  },
});
