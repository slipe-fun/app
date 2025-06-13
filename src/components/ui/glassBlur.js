import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { GLView } from "expo-gl";
import { Asset } from "expo-asset";
import { vertexShader, fragmentShader } from "../../shaders/glass.js";

const BLUR_SCALE = 1.25;
const EFFECT_RADIUS = 30000.0;

export default function BlurredGlassEffect() {
  const touch = useRef({ x: 0, y: 0, down: 0 });
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const handleTouch = (evt) => {
    if (!layout.width || !layout.height) return;
    const { locationX, locationY } = evt.nativeEvent;
    const rawX = locationX;
    const rawY = layout.height - locationY;
    touch.current.x = rawX - layout.width * -0.9;
    touch.current.y = rawY - layout.height * -0.9;
  };

  const onContextCreate = async (gl) => {
    const asset = Asset.fromModule(
      require("../../../assets/test/bg-example.png")
    );
    await asset.downloadAsync();

    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vertexShader);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fragmentShader);
    gl.compileShader(fs);

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      asset
    );

    const iResolutionLoc = gl.getUniformLocation(program, "iResolution");
    const iMouseLoc = gl.getUniformLocation(program, "iMouse");
    const iChannel0Loc = gl.getUniformLocation(program, "iChannel0");
    const uImgSizeLoc = gl.getUniformLocation(program, "uImgSize");
    const uBlurScaleLoc = gl.getUniformLocation(program, "uBlurScale");
    const uEffectRadiusLoc = gl.getUniformLocation(program, "uEffectRadius");

    gl.uniform2f(uImgSizeLoc, asset.width, asset.height);
    gl.uniform1f(uBlurScaleLoc, BLUR_SCALE);
    gl.uniform1f(uEffectRadiusLoc, EFFECT_RADIUS);

    const render = () => {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.uniform2f(
        iResolutionLoc,
        gl.drawingBufferWidth,
        gl.drawingBufferHeight
      );
      gl.uniform4f(
        iMouseLoc,
        touch.current.x,
        touch.current.y,
        touch.current.down,
        0.0
      );

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.uniform1i(iChannel0Loc, 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.endFrameEXP();

      requestAnimationFrame(render);
    };

    render();
  };

  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent: { layout } }) => setLayout(layout)}
    >
      <GLView style={styles.glView} onContextCreate={onContextCreate} />
      <View
        style={styles.touchOverlay}
        onStartShouldSetResponder={() => true}
        onResponderGrant={(evt) => {
          touch.current.down = 1;
          handleTouch(evt);
        }}
        onResponderMove={handleTouch}
        onResponderRelease={() => {
          touch.current.down = 0;
        }}
        onResponderTerminate={() => {
          touch.current.down = 0;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1,
    position: "relative",
  },
  glView: {
    flex: 1,
  },
  touchOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
});
