import { StyleSheet, Text, View } from "react-native"
import WeatherCard from "./components/WeatherCard"

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <WeatherCard />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white"},
})