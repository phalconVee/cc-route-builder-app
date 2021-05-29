import React, { Component } from "react";
import { Map as LeafletMap, tileLayer } from "leaflet";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;

  .marker-icon {
    text-align: center;
    padding-top: 2px;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 12px;
  }

  @media only screen and (max-width: 800px) {
    height: 100vh;
  }
`;

class Map extends Component {
  constructor(props) {
    super(props);
    this.mapContainer = null;
  }

  createLeafletElement() {
    return new LeafletMap(this.mapContainer, {
      layers: [
        tileLayer(
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
              "pk.eyJ1IjoicGhhbGNvbnZlZSIsImEiOiJja3A5cmltcDUwZ2dtMnFxbWpoMzE0bDk2In0.fAAGDROdT0DBcV_Hf1RQtg",
          }
        ),
      ],
    }).locate({ setView: true, maxZoom: 12 });
  }

  componentDidMount() {
    this.leafletElement = this.createLeafletElement();

    this.leafletElement.addLayer(this.props.route);

    this.leafletElement.on("click", this.props.addMarkers);
    this.leafletElement.on("click", this.props.addLines);
  }

  componentWillUnmount() {
    this.leafletElement.off("click", this.props.addMarkers);
    this.leafletElement.off("click", this.props.addLines);
  }

  render() {
    return (
      <Container ref={(el) => (this.mapContainer = el)}>
        {this.props.children}
      </Container>
    );
  }
}

export default Map;
