"use client"

import React, { useRef } from 'react'
import { Environment, OrbitControls } from '@react-three/drei'
import FloatingCan from '@/components/FloatingCan'
import { Group } from 'three'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/hooks/useStore";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {}

export default function Scene({}: Props) {

  const isReady= useStore((state) => state.isReady);
  const can1Ref= useRef<Group>(null)
  const can2Ref= useRef<Group>(null)
  const can3Ref= useRef<Group>(null)
  const can4Ref= useRef<Group>(null)
  const can5Ref= useRef<Group>(null)

  const can1GroupRef= useRef<Group>(null)
  const can2GroupRef= useRef<Group>(null)


  const groupRef= useRef<Group>(null)

  const FLOAT_SPEED= 1.5

  useGSAP(() => {
    if(
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !groupRef.current
    ) 
    return;

    isReady();

    //Can Start LOCATION
  gsap.set(can1Ref.current.position, {x: -1.5})
  gsap.set(can1Ref.current.rotation, {x: -0.5})
  
  gsap.set(can2Ref.current.position, {x: 1.5})
  gsap.set(can2Ref.current.rotation, {x: 0.5})

  gsap.set(can3Ref.current.position, {y: 5, z: 2})
  gsap.set(can4Ref.current.position, {x: 2, y:4, z: 2})
  gsap.set(can5Ref.current.position, {y: -5})

  const introTl= gsap.timeline({
    defaults:{
      duration: 3,
      ease: "back.out(1.4)",
    }
  })

  if(window.scrollY< 20){

    introTl
    .from(can1GroupRef.current.position, {y: -5, x: 1}, 0)
    .from(can1GroupRef.current.rotation, {z: 3}, 0)
    .from(can2GroupRef.current.position, {y: 5, x: 1}, 0)
    .from(can2GroupRef.current.rotation, {z: 3}, 0)
  }

  const scrollTl= gsap.timeline({
    defaults: {
      duration: 2,
    },
    scrollTrigger:{
      trigger: ".hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
    },
  });
  scrollTl
  //group rotation
  .to(groupRef.current.rotation, {y: Math.PI*2}, 0)
  //Can1 ref location
  .to(can1Ref.current.position, {x:-.2, y:-.7, z:-.2}, 0)
  .to(can1Ref.current.rotation, {z:.3}, 0)
  //Can2 ref location
  .to(can2Ref.current.position, {x:1, y:-.2, z:-1}, 0)
  .to(can2Ref.current.rotation, {z:0}, 0)
  
  .to(groupRef.current.position, {x:1, duration:3, ease:'sine.inOut'}, 
    1.3,
  )
  




});

  return (
    <group ref={groupRef}>
      
      <group ref={can1GroupRef}>
    <FloatingCan ref={can1Ref} flavor="lemonLime" floatSpeed={FLOAT_SPEED}/>
      </group>

    <group ref={can2GroupRef}>
    <FloatingCan ref={can2Ref} flavor="blackCherry" floatSpeed={FLOAT_SPEED}/>
    </group>

    <FloatingCan ref={can3Ref} flavor="grape" floatSpeed={FLOAT_SPEED}/>

    <FloatingCan ref={can4Ref} flavor="strawberryLemonade" floatSpeed={FLOAT_SPEED}/>

    <FloatingCan ref={can5Ref} flavor="watermelon" floatSpeed={FLOAT_SPEED}/>

    {/*<OrbitControls/>*/}
    
    <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5}/>
    </group>
    
  )
}