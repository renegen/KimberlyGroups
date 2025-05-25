"use client";

import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";

const o = new THREE.Object3D();

export function CoffeeBeans({
  count = 50,
  speed = 1,
  repeat = true,
}) {
  const groupRef = useRef<THREE.Group>(null);
  const bubbleSpeed = useRef(new Float32Array(count));
  const minSpeed = speed * 0.001;
  const maxSpeed = speed * 0.004;

  const { scene } = useGLTF("/models/coffee_bean.glb");

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    for (let i = 0; i < count; i++) {
      const bean = scene.clone(true);

      // Apply brown transparent material
      bean.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0x5c4033),
            transparent: true,
            opacity: 0.6,
            depthWrite: false,
          });
        }
      });

      // Better spatial distribution
      const radius = gsap.utils.random(2, 4);
      const angle = gsap.utils.random(0, Math.PI * 2);
      const y = gsap.utils.random(-2, 2);
      const x = Math.cos(angle) * radius + gsap.utils.random(-1, 1); // jitter
      const z = Math.sin(angle) * radius - 4 + gsap.utils.random(-1, 1); // push deeper

      bean.position.set(x, y, z);

      bean.rotation.set(
        gsap.utils.random(0, Math.PI),
        gsap.utils.random(0, Math.PI),
        gsap.utils.random(0, Math.PI)
      );

      bean.scale.setScalar(0.04 + Math.random() * 0.01); // add slight size variation
      group.add(bean);

      bubbleSpeed.current[i] = gsap.utils.random(minSpeed, maxSpeed);
    }

    return () => {
      group.clear();
    };
  }, [scene, count, minSpeed, maxSpeed]);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    for (let i = 0; i < group.children.length; i++) {
      const bean = group.children[i];
      bean.position.y += bubbleSpeed.current[i];

      // Respawn below when they rise past view
      if (bean.position.y > 3 && repeat) {
        bean.position.y = -2;

        // Regenerate x, z with same logic for better spread
        const radius = gsap.utils.random(2, 4);
        const angle = gsap.utils.random(0, Math.PI * 2);
        const x = Math.cos(angle) * radius + gsap.utils.random(-1, 1);
        const z = Math.sin(angle) * radius - 4 + gsap.utils.random(-1, 1);
        bean.position.x = x;
        bean.position.z = z;
      }

      bean.rotation.x += 0.005;
      bean.rotation.y += 0.005;
    }
  });

  return <group ref={groupRef} />;
}
