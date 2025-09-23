import { StyleSheet, Text, View } from "react-native"
import WeatherCard from "./components/WeatherCard"

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <Text style={styles.subtitle}>Check real-time weather worldwide</Text>
      <WeatherCard />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 80, 
    paddingHorizontal: 16,
    backgroundColor: "#ffffffff", 
  },
  title: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: "bold",
    color: "#0284c7", 
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#475569", 
    marginBottom: 20,
    textAlign: "center",
  },
});
