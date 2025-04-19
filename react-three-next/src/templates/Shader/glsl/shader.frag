uniform sampler2D videoTexture;
varying vec2 vUv;

void main() {
  gl_FragColor = texture2D(videoTexture, vUv);
}
