import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Quicksand',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  shortcuts: {
    'bg-main': 'bg-[#141414]',
    'text-main': 'text-white',
    'bg-secondary': 'bg-[#1f1f1f]',
    'text-secondary': 'text-[#cccccc]',
    'bg-tertiary': 'bg-[#2b2b2b]',
    'bg-highlight': 'bg-[#ff3f6c]',
    'text-highlight': 'text-[#ff3f6c]',
    'bg-accent': 'bg-[#f90b31]',
    'text-accent': 'text-[#f90b31]',
    'border-accent': 'border-[#f90b31]',
    'border-highlight': 'border-[#ff3f6c]',
    'border-secondary': 'border-[#1f1f1f]',
    'max-w-8xl': 'max-w-85rem',
    'max-w-9xl': 'max-w-90rem',
    'max-w-10xl': 'max-w-95rem',
  },
  theme: {
    breakpoints: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
  },
})
