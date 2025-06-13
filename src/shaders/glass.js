export const fragmentShader = `precision highp float;

uniform vec2 iResolution;
uniform vec4 iMouse;
uniform sampler2D iChannel0;
uniform vec2 uImgSize;
uniform float uBlurScale;
uniform float uEffectRadius;

varying vec2 vUv;

vec2 coverUV(vec2 uv) {
    vec2 win = iResolution;
    vec2 img = uImgSize;
    vec2 scale = win / img;
    float s = max(scale.x, scale.y);
    vec2 sz = img * s;
    vec2 offs = (sz - win) * 0.5;
    return (uv * win + offs) / sz;
  }

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 invRes = 1.0 / iResolution;
    vec2 uvRaw = fragCoord * invRes;
    vec2 uv = vec2(uvRaw.x, 1.0 - uvRaw.y);

    vec4 baseColor = texture2D(iChannel0, coverUV(uv));

    vec2 mRaw = iMouse.xy * invRes;
    if (iMouse.z < 0.5) mRaw = vec2(0.5);
    vec2 delta = uvRaw - mRaw;

    float roundedBox = pow(abs(delta.x * iResolution.x / iResolution.y), 8.0) +
                       pow(abs(delta.y), 8.0);
    float rb1 = clamp((1.0 - roundedBox * (uEffectRadius * 4.0)) * 8.0, 0.0, 1.0);
    float rb2 = clamp((0.95 - roundedBox * (uEffectRadius * 3.8)) * 16.0, 0.0, 1.0) -
                clamp(pow(0.9 - roundedBox * (uEffectRadius * 3.8), 1.0) * 16.0, 0.0, 1.0);
    float rb3 = clamp((1.5 - roundedBox * (uEffectRadius * 4.4)) * 2.0, 0.0, 1.0) -
                clamp(pow(1.0 - roundedBox * (uEffectRadius * 4.4), 1.0) * 2.0, 0.0, 1.0);

    float transition = smoothstep(0.0, 1.0, rb1 + rb2);
    if (transition < 1e-3) {
      fragColor = baseColor;
      return;
    }

    vec2 lensRaw = ((uvRaw - 0.5) * (1.0 - roundedBox * uEffectRadius) + 0.5);
    vec2 lens = vec2(lensRaw.x, 1.0 - lensRaw.y);

    vec4 sum = vec4(0.0);
    float total = 0.0;

    for (float x = -4.0; x <= 4.0; x++) {
      for (float y = -4.0; y <= 4.0; y++) {
        vec2 offRaw = vec2(x, y) * uBlurScale * invRes;
        vec2 sampleRaw = lensRaw + offRaw;
        vec2 sampleUV = vec2(sampleRaw.x, 1.0 - sampleRaw.y);
        sum += texture2D(iChannel0, coverUV(sampleUV));
        total += 1.0;
      }
    }

    vec4 blur = sum / total;

    float grad = clamp((clamp(delta.y, 0.0, 0.2) + 0.1) / 2.0, 0.0, 1.0) +
                 clamp((clamp(-delta.y, -1000.0, 0.2) * rb3 + 0.1) / 2.0, 0.0, 1.0);
    vec4 lighting = clamp(blur + vec4(rb1) * grad + vec4(rb2) * 0.3, 0.0, 1.0);

    lighting *= 0.85;
    fragColor = mix(baseColor, lighting, transition);
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }`;

export const vertexShader = `attribute vec2 aPosition;
  varying vec2 vUv;
  
  void main() {
      vUv = aPosition * 0.5 + 0.5;
      gl_Position = vec4(aPosition, 0.0, 1.0);
  }`;
