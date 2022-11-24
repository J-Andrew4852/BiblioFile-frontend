import { Animation as CreateAnimationData } from "./create-anim"
import { Animation as RandomizeAnimationData } from "./randomise-anim"
import { Animation as EditAnimationData } from "./edit-anim"

export const RandomiseAnimation = (element) => bodymovin.loadAnimation({
  container: element,
  renderer: "svg",
  loop: true,
  autoplay: true,
  animationData: RandomizeAnimationData,
});
export const CreateAnimation = (element) => bodymovin.loadAnimation({
  container: element,
  renderer: "svg",
  loop: true,
  autoplay: true,
  animationData: CreateAnimationData,
});
export const EditAnimation = (element) => bodymovin.loadAnimation({
  container: element,
  renderer: "svg",
  loop: true,
  autoplay: true,
  animationData: EditAnimationData,
});
