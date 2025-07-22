const fragmentShader = `
precision highp float;
varying vec2 uv;
uniform float u_time;
uniform float u_speed;
uniform float u_amp;
uniform float u_freq;
uniform float u_brightness;
uniform int u_colorCount;
uniform vec3 u_colors[16];
uniform int u_blendMode;

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = rand(i);
  float b = rand(i + vec2(1.0, 0.0));
  float c = rand(i + vec2(0.0, 1.0));
  float d = rand(i + vec2(1.0, 1.0));
  vec2 u = smoothstep(0.0, 1.0, f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

vec3 blend(vec2 pos, float t) {
  vec2 offset = vec2(
    noise(pos * u_freq + t * vec2(0.1, 0.2)),
    noise(pos * u_freq + t * vec2(0.3, 0.1))
  ) * u_amp;

  pos += offset;

  vec3 col = vec3(0.0);
  float totalWeight = 0.0;

  for (int i = 0; i < 16; i++) {
    if (i >= u_colorCount) break;
    float w = smoothstep(0.0, 1.0, sin(float(i) + pos.x * u_freq + pos.y * u_freq + t));
    col += u_colors[i] * w;
    totalWeight += w;
  }

  if (totalWeight > 0.0) {
    col /= totalWeight;
  }

  if (u_blendMode == 1) {
    col = clamp(col * float(u_colorCount), 0.0, 1.0);
  }

  col *= u_brightness;
  return col;
}

void main() {
  vec3 color = blend(uv, u_time * u_speed);
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`;

export default fragmentShader;