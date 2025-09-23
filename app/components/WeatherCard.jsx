import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const API = "ca6f68aac44af682d699cc859590f9a4";

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState(false);

  const fetchWeatherData = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`
      );
      const data = await response.json();
      setWeatherData(data);
      setSearch(true);
    } catch (error) {
      console.log("Error fetching weather data", error);
      setWeatherData(null);
      setSearch(true);
    }
  };

  const handleEnterPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Enter") fetchWeatherData();
  };

  return (
    <LinearGradient
      colors={["#06b6d4", "#3b82f6"]}
      style={styles.card}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter City Name"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={fetchWeatherData} // Enter key triggers search
        />
        <TouchableOpacity onPress={fetchWeatherData}>
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {search && (
        <View style={styles.weatherContainer}>
          {weatherData && weatherData.main ? (
            <>
              <Text style={styles.temp}>
                {(weatherData.main.temp - 273.15).toFixed(1)}°C
              </Text>
              <Text style={styles.cityName}>{weatherData.name}</Text>

              <View style={styles.row}>
                <View style={styles.info}>
                  <MaterialCommunityIcons name="weather-windy" size={24} color="white" />
                  <Text style={styles.infoText}>
                    {(weatherData.wind.speed * 3.6).toFixed(1)} km/h
                  </Text>
                </View>
                <View style={styles.info}>
                  <MaterialCommunityIcons name="water-percent" size={24} color="white" />
                  <Text style={styles.infoText}>
                    {weatherData.main.humidity} %
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.info}>
                  <Feather name="sun" size={24} color="white" />
                  <Text style={styles.infoText}>
                    {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
                <View style={styles.info}>
                  <Feather name="sunset" size={24} color="white" />
                  <Text style={styles.infoText}>
                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={{ color: "white", marginTop: 20 }}>Weather Data not found</Text>
          )}
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 350,
    borderRadius: 20,
    padding: 16,
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    padding: 8,
    borderRadius: 20,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  temp: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
  cityName: {
    fontSize: 24,
    color: "white",
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    color: "white",
    fontSize: 18,
  },
});

export default WeatherCard;