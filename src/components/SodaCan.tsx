"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Preload model
useGLTF.preload("/Soda-can.gltf");

// All flavors and their texture paths
const flavorTextures = {
  lemonLime: "/labels/label1.jpg",
  grape: "/labels/label2.jpg",
  blackCherry: "/labels/label4.jpg",
  strawberryLemonade: "/labels/label3.jpg",
  watermelon: "/labels/label4.jpg",
  ButterScotch: "/labels/label1.jpg",
  ClassicCappuiccino: "/labels/label2.jpg",
  OrangeMocha: "/labels/label3.jpg",
  DarkMocha: "/labels/label4.jpg",
  VanillaBliss: "/labels/label5.jpg",
} as const;

// Metal material for parts of the can
const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

// Flavor types
export type SodaCanProps = {
  flavor?: keyof typeof flavorTextures;
  scale?: number;
};

export function SodaCan({
  flavor = "blackCherry",
  scale = 2,
  ...props
}: SodaCanProps) {
  const { nodes } = useGLTF("/Soda-can.gltf");
  const labels = useTexture(flavorTextures);

  // Disable flipY for all textures
  Object.values(labels).forEach((texture) => {
    texture.flipY = false;
  });

  const label = labels[flavor];

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder as THREE.Mesh).geometry}
        material={metalMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.cylinder_1 as THREE.Mesh).geometry}
      >
        <meshStandardMaterial roughness={0.15} metalness={0.7} map={label} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Tab as THREE.Mesh).geometry}
        material={metalMaterial}
      />
    </group>
  );
}
