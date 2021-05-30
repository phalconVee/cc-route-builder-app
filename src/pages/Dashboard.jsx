import React, { Component } from "react";
import styled from "@emotion/styled";
import togpx from "togpx";
import { featureGroup } from "leaflet";

import { createMarker, MarkerIcon } from "../components/Marker/Marker";
import { createPolyline } from "../components/Polyline/Polyline";
import SideNav from "../components/SideNav/SideNav";
import Map from "../components/Map/Map";

const Container = styled.div`
  display: flex;
  height: 100vh;

  @media only screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

class Dashboard extends Component {
  state = {
    route: new featureGroup(),
    markers: [],
    markerCoordinates: [],
    polyline: {},
    shouldUpdateRoute: false,
  };

  addMarkers = (e) => {
    const { markers, route } = this.state;
    const coordinates = e.latlng;
    const markerCoordinates = [coordinates.lat, coordinates.lng];

    const marker = createMarker(markers, coordinates);

    this.setState((prevState) => {
      return {
        ...prevState,
        markers: [...prevState.markers, marker],
        markerCoordinates: [...prevState.markerCoordinates, markerCoordinates],
        shouldUpdateRoute: false,
      };
    });

    marker.addTo(route);
  };

  addLines = () => {
    const { markerCoordinates, route } = this.state;

    const polyline = createPolyline(markerCoordinates);

    this.setState((prevState) => {
      return {
        ...prevState,
        polyline,
        shouldUpdateRoute: false,
      };
    });

    polyline.addTo(route);
  };

  /**
   * When the list is re-arranged, this function updates the markers
   * and adds updated markers and polylines to the route layer
   *
   * @param {*} rearrangedMarkers
   */

  handleSort = (rearrangedMarkers) => {
    const { route, markers } = this.state;

    const markerCoordinates = rearrangedMarkers.map(
      (marker) => marker.coordinates
    );

    markers.map((marker) => route.removeLayer(marker));
    this.removeLayers("Polyline");

    const polyline = createPolyline(markerCoordinates);
    route.addLayer(polyline);

    let id = 1;
    this.setState((prevState) => {
      return {
        ...prevState,
        markers: rearrangedMarkers.map((marker) => {
          marker.id = id;
          marker.name = `Waypoint ${id}`;
          marker.options.icon = MarkerIcon(id);

          marker.addTo(route);

          id = id + 1;
          return marker;
        }),
        markerCoordinates: markerCoordinates,
        polyline,
        shouldUpdateRoute: false,
      };
    });
  };

  /**
   * this function deletes it from the state and the route layer,
   * when a marker (waypoint) is deleted from the list.
   * it then updates the markers and polylines with the new ones
   * and adds it back to the route layer.
   *
   * @param {*} id
   */
  handleDelete = (id) => {
    const { markers, route } = this.state;

    const markersToKeep = markers.filter((marker) => marker.id !== id);
    const markerToDelete = markers.find((marker) => marker.id === id);

    route.removeLayer(markerToDelete);

    this.setState((prevState) => {
      return {
        ...prevState,
        route,
        markers: markersToKeep,
        markerCoordinates: markersToKeep.map((marker) => marker.coordinates),
        shouldUpdateRoute: true,
      };
    });

    // Reset the state if all markers are deleted
    if (markers.length === 1) {
      this.resetState();
    }
  };

  /**
   * Converts route geoJSON data to GPX
   * and creates a temporary link that allows
   * to download the GPX data.
   */
  handleDownload = () => {
    const { route, polyline } = this.state;
    const tempRoute = new featureGroup();

    // This makes sure that only one final polyline is present
    // in the route layer
    this.removeLayers("Polyline");
    route.addLayer(polyline);

    // Adds the final lines (track) to the route
    tempRoute.addLayer(polyline);
    const routeGeoJSON = tempRoute.toGeoJSON();
    const routeGPX = togpx(routeGeoJSON);
    const filename = "komoot-cross-country-route.gpx";

    const downloadLink = document.createElement("a");
    downloadLink.setAttribute(
      "href",
      "data:text/plain;charset=utf-8, " + encodeURIComponent(routeGPX)
    );
    downloadLink.setAttribute("download", filename);

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);
  };

  /**
   * Removes the old markers from the route layer.
   * Updates the markers ID's and names with the correct id
   * based on its place in the list and adds them back to the route layer
   */
  updateMarkers = () => {
    const { markers, route } = this.state;

    markers.map((marker) => route.removeLayer(marker));

    let id = 1;
    this.setState((prevState) => {
      return {
        ...prevState,
        markers: prevState.markers.map((marker) => {
          marker.id = id;
          marker.name = `Waypoint ${id}`;
          marker.options.icon = MarkerIcon(id);

          marker.addTo(route);

          id = id + 1;
          return marker;
        }),
        shouldUpdateRoute: false,
      };
    });
  };

  /**
   * Removes the old polyline from the route layer.
   * Creates a new polyline with the current marker coordinates and
   * adds it to the route layer
   */
  updatePolyline = () => {
    const { route, markerCoordinates } = this.state;

    this.removeLayers("Polyline");

    const polyline = createPolyline(markerCoordinates);

    route.addLayer(polyline);

    this.setState((prevState) => {
      return {
        ...prevState,
        polyline,
        shouldUpdateRoute: false,
      };
    });
  };

  resetState = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        markers: [],
        markerCoordinates: [],
        polyline: {},
        shouldUpdateRoute: false,
      };
    });
  };

  /**
   * Allows to remove multiple layers from the route layer
   * based on the provided type
   * @param {*} type
   */
  removeLayers = (type) => {
    const { route } = this.state;

    for (const layer in route._layers) {
      const layerObj = route._layers[layer];

      if (layerObj["type"] === type) {
        route.removeLayer(layerObj);
      }
    }
  };

  componentDidUpdate() {
    const { shouldUpdateRoute } = this.state;

    if (shouldUpdateRoute) {
      this.updateMarkers();
      this.updatePolyline();
    }
  }

  render() {
    const { markers, route } = this.state;

    return (
      <Container>
        <SideNav
          markers={markers}
          handleSort={this.handleSort}
          handleDelete={this.handleDelete}
          handleDownload={this.handleDownload}
        />
        <Map
          addMarkers={this.addMarkers}
          addLines={this.addLines}
          route={route}
        />
      </Container>
    );
  }
}

export default Dashboard;
