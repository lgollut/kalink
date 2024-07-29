import { vars } from './contract.css';

export const transition: (
  props: string | string[],
  options?: {
    duration?: keyof typeof vars.ref.duration;
    easing?: keyof typeof vars.ref.easing;
    delay?: string;
  },
) => string = (props = ['all'], options = {}) =>
  (Array.isArray(props) ? props : [props])
    .map(
      (animatedProp) =>
        `${animatedProp} ${
          options.duration
            ? vars.ref.duration[options.duration]
            : vars.ref.duration.standard
        } ${options.easing ? vars.ref.easing[options.easing] : vars.ref.easing.inOut} ${
          options.delay || '0ms'
        }`,
    )
    .join(',');
