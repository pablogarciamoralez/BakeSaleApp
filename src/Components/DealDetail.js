import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";
import { priceDisplay } from "../Utils/functions";
import ajax from "./ajax";

export default class DealDetail extends React.Component {
  imageXPos = new Animated.Value(0);
  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      this.imageXPos.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      this.cellWidth = Dimensions.get("window").width;
      if (Math.abs(gs.dx) > this.cellWidth * 0.4) {
        const direction = Math.sign(gs.dx);
        Animated.timing(this.imageXPos, {
          toValue: direction * this.cellWidth,
          duration: 250,
        }).start(() => this.handleSwipe(-1 * direction));
      } else {
        Animated.spring(this.imageXPos, {
          toValue: 0,
        }).start();
      }
    },
  });

  handleSwipe = (indexDirection) => {
    if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
      Animated.spring(this.imageXPos, {
        toValue: 0,
      }).start();
      return;
    }
    this.setState(
      (prevState) => ({
        imageIndex: prevState.imageIndex + indexDirection,
      }),
      () => {
        this.imageXPos.setValue(indexDirection * this.cellWidth);
        Animated.spring(this.imageXPos, {
          toValue: 0,
        }).start();
      }
    );
  };
  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  state = {
    deal: this.props.initialDealData,
    imageIndex: 0,
  };

  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
    this.setState({
      deal: fullDeal,
    });
  }

  render() {
    const { deal } = this.state;
    return (
      <View style={styles.deal}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
        <Animated.Image
          {...this.imagePanResponder.panHandlers}
          source={{ uri: deal.media[this.state.imageIndex] }}
          style={[{ left: this.imageXPos }, styles.image]}
        />
        <View style={styles.info}>
          <Text style={styles.title}>{deal.title}</Text>
          <View style={styles.footer}>
            <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
            <Text style={styles.cause}>{deal.cause.name}</Text>
          </View>
        </View>
        {deal.user && (
          <View style={styles.user}>
            <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
            <Text>{deal.user.name}</Text>
          </View>
        )}
        <View style={styles.description}>
          <Text>{deal.description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
  },
  backLink: {
    marginBottom: 10,
    color: "#0645ad",
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: "#ccc",
    // borderColor: "#bbb",
    // borderWidth: 1,
    // borderBottomWidth: 0,
  },
  info: {
    // padding: 10,
    // backgroundColor: "#fff",
    // borderColor: "#bbb",
    // borderWidth: 1,
    // borderTopWidth: 0,
    alignItems: "center",
  },
  detail: {
    borderColor: "#bbb",
    borderWidth: 1,
    borderTopWidth: 0,
  },
  title: {
    fontSize: 16,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "rgba(237, 149, 45, 0.4)",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 15,
  },
  cause: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: "right",
  },
  avatar: {
    width: 60,
    height: 60,
  },
});
