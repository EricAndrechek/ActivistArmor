import * as React from "react";
import { Text, TouchableOpacity, Image, View, StyleSheet } from "react-native";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { LinearGradient } from "expo-linear-gradient";

import CustomHeader from "../components/Header";
import CustomBottomTab from "../components/BottomTab";
import CustomText from "../components/TextField";

import API_KEY from "../env";

export default class PostScreen extends React.Component {
  state = {
    image: null,
    address: "",
    lat: null,
    long: null
  };

  render() {
    let { image } = this.state;

    return (
      <LinearGradient colors={["#2193b0", "#6dd5ed"]} style={styles.container}>
        <CustomHeader
          nav={this.props.navigation}
          title={"Post"}
          searchBar={true}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              margin: 10
            }}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.emptyPhoto} />
            ) : (
              <Image
                source={require("../assets/images/camera.png")}
                style={styles.emptyPhoto}
              />
            )}
            <View style={{ flex: 2 }}>
              <TouchableOpacity
                onPress={this._pickImage}
                style={styles.infoCard}
              >
                <Text style={styles.infoCardText}>Choose a Media File</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._takePhoto}
                style={styles.infoCard}
              >
                <Text style={styles.infoCardText}>Take a photo</Text>
              </TouchableOpacity>
            </View>
          </View>

          <CustomText label={"Caption"} />
          <GooglePlacesAutocomplete
            placeholder="Where did this happen?"
            fetchDetails={true}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              const coords = details.geometry.location;
              this.setState({
                address: details.formatted_address,
                lat: coords.lat,
                long: coords.lng
              });
              console.log(this.state.lat);
            }}
            placeholderTextColor={"#fafafa"}
            styles={{
              textInputContainer: {
                backgroundColor: "transparent",
                borderTopWidth: 0,
                borderBottomWidth: 0
              },
              textInput: {
                color: "#fafafa",
                backgroundColor: "transparent",
                borderBottomWidth: 0.5,
                borderBottomColor: "#999",
                fontSize: 16
              },
              container: {
                marginHorizontal: 10
              }
            }}
            query={{
              key: API_KEY,
              language: "en"
            }}
          />

          <View style={{ height: 20 }} />
          <TouchableOpacity
            onPress={this._submitPhoto}
            style={styles.postButton}
          >
            <Text style={styles.infoCardText}>Report This Incident</Text>
          </TouchableOpacity>
          <CustomBottomTab nav={this.props.navigation} />
        </View>
      </LinearGradient>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }

      const { status2 } = await Permissions.askAsync(Permissions.CAMERA);
      if (status2 !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: false
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    } catch (E) {
      console.log(E);
    }
  };

  _takePhoto = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
        base64: false
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    } catch (E) {
      console.log(E);
    }
  };

  _submitPhoto = () => {
    let photo = { uri: this.state.image };
    let formdata = new FormData();

    formdata.append(
      "location",
      "(" + this.state.lat.toString() + ", " + this.state.long.toString() + ")"
    );
    formdata.append("file", {
      uri: photo,
      name: "image.jpg",
      type: "image/jpeg"
    });

    fetch("https://activistarmor.space/post", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formdata
    })
      .then((response) => {
        console.log("form sent");
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  emptyPhoto: {
    width: 100,
    height: 100,
    borderRadius: 5,
    flex: 0.7
  },
  infoCard: {
    backgroundColor: "lightblue",
    margin: 5,
    padding: 12,
    borderRadius: 5,
    elevation: 2,
    width: "100%"
  },
  postButton: {
    backgroundColor: "lightgreen",
    margin: 30,
    marginBottom: 30,
    padding: 12,
    borderRadius: 5,
    elevation: 2
  },
  infoCardText: {
    textAlign: "center",
    fontSize: 18
  }
});
