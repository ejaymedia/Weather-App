import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { WEATHER_API_KEY } from "@env";

const API = WEATHER_API_KEY;

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState(false);

  const fetchCitySuggestions = async (text) => {
    setCity(text);
    if (text.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=${API}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (err) {
      console.log("Error fetching city suggestions", err);
    }
  };

  const fetchWeatherData = async (selectedCity) => {
    const name = selectedCity?.name || city;
    if (!name) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        setWeatherData(null);
      } else {
        setWeatherData(data);
      }
      setSearch(true);
      setSuggestions([]);
      setCity(name);
    } catch (error) {
      console.log("Error fetching weather data", error);
      setWeatherData(null);
      setSearch(true);
    }
  };

  return (
    <LinearGradient colors={["#06b6d4", "#3b82f6"]} style={styles.card}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter City Name"
          value={city}
          onChangeText={fetchCitySuggestions}
        />
        <TouchableOpacity onPress={() => fetchWeatherData()}>
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          style={styles.suggestionsList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => fetchWeatherData(item)}
            >
              <Text>
                {item.name}
                {item.state ? `, ${item.state}` : ""}, {item.country}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {search && (
        <View style={styles.weatherContainer}>
          {weatherData && weatherData.main ? (
            <>
              <Text style={styles.temp}>{weatherData.main.temp.toFixed(1)}°C</Text>
              <Text style={styles.cityName}>{weatherData.name}</Text>

              <View style={styles.row}>
                <View style={styles.info}>
                  <MaterialCommunityIcons name="weather-windy" size={24} color="white" />
                  <Text style={styles.label}>Wind: </Text>
                  <Text style={styles.infoText}>{(weatherData.wind.speed * 3.6).toFixed(1)} km/h</Text>
                </View>
                <View style={styles.info}>
                  <MaterialCommunityIcons name="water-percent" size={24} color="white" />
                  <Text style={styles.label}>Humidity: </Text>
                  <Text style={styles.infoText}>{weatherData.main.humidity} %</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.info}>
                  <Feather name="sun" size={24} color="white" />
                  <Text style={styles.label}>Sunrise: </Text>
                  <Text style={styles.infoText}>
                    {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
                <View style={styles.info}>
                  <Feather name="sunset" size={24} color="white" />
                  <Text style={styles.label}>Sunset: </Text>
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
  input: { flex: 1, padding: 8, borderRadius: 20 },
  suggestionsList: {
    backgroundColor: "white",
    marginTop: 5,
    borderRadius: 10,
    maxHeight: 120,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  weatherContainer: { marginTop: 20, alignItems: "center" },
  temp: { fontSize: 48, fontWeight: "bold", color: "white" },
  cityName: { fontSize: 24, color: "white", marginTop: 5 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  info: { flexDirection: "row", alignItems: "center", flex: 1, flexWrap: "wrap" },
  label: { color: "white", fontSize: 16},
  infoText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default WeatherCard;