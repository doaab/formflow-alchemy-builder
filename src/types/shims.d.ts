
// This file contains shim type declarations for missing dependencies

declare module 'framer-motion' {
  export const motion: any;
  export const AnimatePresence: React.FC<{ children: React.ReactNode }>;
  export const useAnimation: () => any;
  export const useInView: (ref: any, options?: any) => boolean;
}
