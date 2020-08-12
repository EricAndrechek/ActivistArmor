import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import CustomHeader from "../../components/Header";

export default function AboutScreen({ navigation }) {
  return (
    <LinearGradient colors={["#2193b0", "#6dd5ed"]} style={styles.container}>
      <CustomHeader nav={navigation} title={"About"} searchBar={false} />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.bold}>Inspiration</Text>
        <Text style={styles.text}>
          {"\t\t"}On May 25th, George Floyd was brutally killed by policemen.
          His death has enlightened thousands of people, marking the existence
          of fatal amounts of racism and the trend towards the United States
          becoming a police state.
          {"\n\n"}
          {"\t\t"}As people bypass quarantine and curfew laws to protest against
          this injustice, several new cases of police brutality have come up.
          Newsfeeds of homeless people being hit by rubber bullets and a small
          girl being pepper-sprayed has continued to fuel the pathos of many
          people. When we see individual stories of the atrocities committed by
          our own protectors, there are usually two trains of thought. Many
          people are enraged and take to the streets more often. Others,
          although horrified, aren’t convinced to protest because they’re only
          exposed to a few news articles with invigorating headlines but a more
          dull truth.
          {"\n\n"}
          {"\t\t"}However, our team’s research has shown that there are a lot
          more cases of brutality than we see. These are a few stills of videos
          we found that were buried deep in the internet. During every protest,
          several new videos surface with unprovoked action against protestors,
          but only a few go viral. We immediately realized the importance of
          visualizing this data. Emotion is strong, but data is stronger! With
          this information, we can convince more people to protest against
          injustice, this time armed with facts and logic.
        </Text>
        <Text style={styles.bold}>What it does</Text>
        <Text style={styles.text}>
          {"\t\t"}With a complex architecture, our team set out on an ambitious
          goal to try and map out all cases of police brutality. Knowing that
          most of these videos surface on Reddit, we built a metadata Reddit
          scraper that searches for media files. Moreover, we also built an
          application with React Native (thus making it cross-platform!) that
          allows users of our app to post their own photos and videos that
          they've recorded onto our app. We prioritized the safety of the
          protestors from a cybersecurity standpoint since we want all users to
          stay anonymous. Thus, we built a unique CNN model from TensorFlow that
          allows face blur from images and protects the identity of any people
          that might be on the video. We don't want people to get targetted!
          {"\n\n"}
          {"\t\t"}However, we don't want to just append any random media file to
          our database! Using Amazon's S3 Bucket and Rekognition APIs, we were
          successfully able to extract how much violence was in our video. Then,
          we uploaded these files to DigitalOcean, extracted a file location,
          and stored this information in MongoDB along with the case's
          geolocation!
          {"\n\n"}
          {"\t\t"}On the client-side, the user is able to see a feed of the most
          recent cases from our MongoDB, and a map showing the geolocation of
          every user-uploaded case.
        </Text>
        <Text style={styles.bold}>What's Next for Activist Armor</Text>
        <Text style={styles.text}>
          {"\t\t"}In order to accomplish our goal of arming activists with
          information, we hope to add a web app to our project, get our app
          published on the App Store and Google Play, and expand our scraper's
          abilities in order to collect content from Twitter, Facebook,
          websites, and more.
          {"\n\n"}
          {"\t\t"}A problem we face with this version of our app, is that our
          server cannot handle video well enough to blur faces in the videos,
          however the code and functionality to do so exists in our program
          already. If we raised enough money, as little as $100, we could
          upgrade our AWS server to include a GPU. This would protect protestors
          from having their face appear in videos on our website to protect them
          from being prosecuted by authorities.
          {"\n\n"}
          {"\t\t"}
          Another way we would like to improve ActivistArmor is to find videos
          of the same event from different angles. We could do this by
          implementing object detection ML and finding match objects in videos.
          Protestors could then see well-documented video of police brutality
          from multiple angles.
          {"\n\n"}
          {"\t\t"}
          Lastly, in order to speed up our content flow, we need to implement a
          way to remove duplicate videos and crop videos down to the content
          that matters. This will allow us to utilize any grant money or funds
          we receive in a more responsible manner and will work better for
          protestors by getting them only the content they want as quickly as
          possible.
        </Text>
        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 30
  },
  bold: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30
  },
  text: {
    color: "white",
    fontSize: 20,
    marginBottom: 20
  }
});
