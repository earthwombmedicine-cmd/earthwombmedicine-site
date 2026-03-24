import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying vec2 vUv;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    vec3 g = a0.x  * vec3(x0.x,x12.xz) + h * vec3(x0.y,x12.yw);
    vec3 l = 1.79284291400159 - 0.85373472095314 * ( g*g + h*h );
    vec3 r = vec3(0.0);
    r.x = g.x * l.x + h.x * l.x;
    r.y = g.y * l.y + h.y * l.y;
    r.z = g.z * l.z + h.z * l.z;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    
    // Create organic flowing movement
    float n1 = snoise(uv * 2.0 + uTime * 0.1);
    float n2 = snoise(uv * 4.0 - uTime * 0.05);
    float n3 = snoise(uv * 1.0 + vec2(uTime * 0.02, uTime * 0.03));
    
    float combinedNoise = n1 * 0.5 + n2 * 0.25 + n3 * 0.25;
    combinedNoise = combinedNoise * 0.5 + 0.5; // map to 0-1
    
    // Smooth the noise for a more "light through canopy" feel
    float mask = smoothstep(0.2, 0.8, combinedNoise);
    
    vec3 finalColor = mix(uColor1, uColor2, mask * 0.4); // Subtle gold influence
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const ShaderPlane = () => {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#0d2b1a") },
    uColor2: { value: new THREE.Color("#D4AF64") }
  }), []);

  useFrame((state) => {
    // 0.0003 time multiplier as requested
    uniforms.uTime.value = state.clock.getElapsedTime() * 0.0003;
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const ForestCanopyShader = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        orthographic
        camera={{ zoom: 1 }}
        gl={{ antialias: false, stencil: false, depth: false }}
        dpr={[1, 2]}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
};

export default ForestCanopyShader;
