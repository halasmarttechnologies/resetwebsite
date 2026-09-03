import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isGsapRegistered = false;

export function initGsap() {
  if (typeof window !== "undefined" && !isGsapRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isGsapRegistered = true;
  }
  return gsap;
}

export { gsap, ScrollTrigger };
