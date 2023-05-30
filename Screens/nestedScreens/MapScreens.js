import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreenPost({ route }) {
  // const location = posts.location.coords;
  // 50.721068, 26.228439;
  const location = route.params.location.coords;
  const title = route.params.title;
  return (
    <View style={styles.conteiner}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={title}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
