"use client";
import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { PrismicText } from '@prismicio/react'
import { TextSplitter } from "@/components/TextSplitter";
import Scene from "./Scene";
import { CoffeeBeans } from "./CoffeeBeans";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";



gsap.registerPlugin(useGSAP,ScrollTrigger);
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {

  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  
  useGSAP(() => {

    if(!ready && isDesktop) return;

    const introTl = gsap.timeline();
    introTl
    .set(".hero", {opacity: 1})
    .from(".hero-header-word", {
      scale: 3,
      opacity: 0,
      ease: "power4.in",
      delay: 0.3,
      stagger: 0.8,
    })
    .from(".hero-subheading", {
      opacity: 0,
      y:30,
    },"+=.8",
  )
  .from(".hero-body", {
    opacity: 0,
    y:10,
  })
  .from(".hero-button", {
    opacity: 0,
    y:10,
    duration:0.6,
  });

  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      markers: true     
    },
  });
  scrollTl
    .fromTo("body",{
    backgroundColor: "#ECC94B",
    },{
      backgroundColor: "#F56565",
      overwrite: "auto",
    })
    .from(".text-side-heading .split-char",{
      scale: 1.3,
      y: 40,
      rotate:-25,
      opacity: 0,
      stagger: 0.1,
      ease: "back.out(3)",
      duration:.6,
    })
   .from(".text-side-body",{
      y: 20,
      opacity: 0, 
    })
  
  },{dependencies: [ready, isDesktop]});



  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero opacity-0"
    >
      {isDesktop && (

        <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block ">
        <Scene/>
        
      </View>
      )}
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h4 className="hero-header text-7xl font-black uppercase leading-[.8] text-orange-100 md:text-[9rem] lg:text-[13rem]">
              <TextSplitter text={asText(slice.primary.heading)} wordDisplayStyle="block" className="hero-header-word"/>
            </h4>
            <div className="hero-subheading mt-12 text-5xl font-semibold text-amber-800 lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>
            <div className="hero-body text-2xl font-normal text-sky-50">
              <PrismicRichText field={slice.primary.body} />
            </div>       
              <Button buttonLink={slice.primary.button_link} buttonText={slice.primary.button_text} className="hero-button mt-12" />
         </div>
        </div>
      <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
      <PrismicNextImage className="w-full md:hidden" field={slice.primary.cans_image} />
      <div >

              <h2 className="text-side-heading text-balance text-6xl font-black text-amber-200 lg:text-8xl">
                <TextSplitter text={asText(slice.primary.second_heading)} />
              </h2>
        <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-amber-300">

      <PrismicRichText field={slice.primary.second_body} />
        </div>
      </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
