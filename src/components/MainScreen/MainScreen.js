import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { Component } from "react";
import Loader from "./../utilities/Loader";
import Constants from "./../utilities/Constants";
import { renderIf } from "../utilities/CommonMethods";
import Styles from "./Styles";
import { customAlert } from "./../utilities/CommonMethods";
import Tabs from "./../Tabs";

class MainScreen extends Component {
  static navigationOptions = {
    headerTitle: Constants.Strings.MAIN_TITLE,
  };
  state = {
    movieList: [],
    isLoading: false,
    searchText: "",
    noData: false,
  };

  searchButtonPressed = () => {
    if (this.state.searchText.length) {
      var endpoint =
        Constants.URL.BASE_URL +
        Constants.URL.SEARCH_QUERY +
        this.state.searchText +
        "&" +
        Constants.URL.API_KEY;
      var request = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      this.setState({ isLoading: true });
      fetch(endpoint, request)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ movieList: responseJson.results, isLoading: false });
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          setTimeout(() => {
            customAlert(error.message);
          }, 500);
        });
    } else {
      customAlert(Constants.Strings.MSG);
    }
  };

  componentDidMount() {
    var endpoint =
      Constants.URL.BASE_URL +
      "movie/popular?api_key=3d95299c83dcab98b01be91e87d8f35a";

    var request = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    this.setState({ isLoading: true });
    fetch(endpoint, request)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ movieList: responseJson.results, isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        setTimeout(() => {
          customAlert(error.message);
        }, 500);
      });
  }
  changeTab(selectedTab) {
    var popular =
      Constants.URL.BASE_URL +
      "movie/popular?api_key=3d95299c83dcab98b01be91e87d8f35a";
    var latest  =
    Constants.URL.BASE_URL +
    Constants.URL.SEARCH_QUERY +
    'Godfather' +
    "&" +
    Constants.URL.API_KEY;
    var request = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    let endpoint = selectedTab == "latest"?   popular:latest
    this.setState({ isLoading: true });
    fetch(endpoint, request)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ movieList: responseJson.results, isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        setTimeout(() => {
          customAlert(error.message);
        }, 500);
      });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.isLoading ? (
          <Loader show={true} loading={this.state.isLoading} />
        ) : null}
        <StatusBar
          backgroundColor={Constants.Colors.Cyan}
          barStyle="light-content"
        />
        <View style={{ backgroundColor: Constants.Colors.Grey }}>
          <View style={Styles.cardView}>
            <View
              style={{
                margin: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                placeholder={Constants.Strings.PLACEHOLDER}
                onChangeText={(text) => this.setState({ searchText: text })}
                underlineColorAndroid={Constants.Colors.Transparent}
              />
              <TouchableOpacity
                onPress={() => this.searchButtonPressed()}
                style={Styles.buttonContainer}
              >
                <Text style={Styles.buttonText}>
                  {Constants.Strings.SEARCH_BUTTON}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Tabs
          selected={(select) => {
            this.changeTab(select);
          }}
        />

        {renderIf(
          this.state.noData,
          <Text style={{ textAlign: "center" }}>No data found.</Text>
        )}
        {renderIf(
          this.state.movieList.length,
          <ScrollView
            style={Styles.movieList}
            showsVerticalScrollIndicator={false}
          >
            <View>
              {this.state.movieList.length > 0 &&
                this.state.movieList.map((obj, i) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("SecondScreen", {
                          id: obj?.id,
                        })
                      }
                      key={i}
                      style={{ margin: 10, marginBottom: 5 }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          style={Styles.image}
                          source={{
                            uri:
                              obj?.poster_path != null
                                ? Constants.URL.IMAGE_URL + obj?.poster_path
                                : Constants.URL.PLACEHOLDER_IMAGE,
                          }}
                        />
                        <View style={{ flexDirection: "column" }}>
                          <Text numberOfLines={3} style={{ fontSize: 17 }}>
                            {obj?.original_title}
                          </Text>
                          <View style={Styles.rowView}>
                            <Text>{Constants.Strings.RELEASE_DATE}</Text>
                            <Text>{obj?.release_date}</Text>
                          </View>
                          <View style={Styles.rowView}>
                            <Text>{Constants.Strings.LANGUAGE}</Text>
                            <Text>{obj?.original_language}</Text>
                          </View>
                          <View style={Styles.rowView}>
                            <Text>{Constants.Strings.POPULARITY}</Text>
                            <Text>{obj?.popularity} %</Text>
                          </View>
                        </View>
                      </View>
                      <View style={Styles.lineView} />
                    </TouchableOpacity>
                  );
                }, this)}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

export default MainScreen;
