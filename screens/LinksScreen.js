import React from "react";
import { ScrollView, StyleSheet, Text, View, Image, Button, TextInput, Modal } from "react-native";
import Expo from "expo";
import ExpoTHREE, { THREE } from "expo-three";
import ExpoGraphics from "expo-graphics";

export default class LinksScreen extends React.Component {
  onContextCreate = async ({ gl, scale, width, height, arSession }) => {
    // Initialize renderer...
    this.renderer = ExpoTHREE.createRenderer({ gl });
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);

    // Initialize scene...
    this.scene = new THREE.Scene();
    //this.scene.background = ExpoTHREE.createARBackgroundTexture(arSession, this.renderer);

    // Initialize camera...
    this.camera = ExpoTHREE.createARCamera(arSession, width / scale, height / scale, 0.01, 1000);
  };

  onRender = delta => {
    // Render...
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <ExpoGraphics.View
        style={{ flex: 1 }}
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        arEnabled={true}
      />
    );
  }
}

const styles = StyleSheet.create({});
