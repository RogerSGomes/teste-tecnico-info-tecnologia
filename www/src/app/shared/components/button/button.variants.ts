import { tv, VariantProps } from 'tailwind-variants';

export const buttonVariants = tv({
  base: 'flex items-center justify-center gap-2 rounded border uppercase shadow-sm disabled:cursor-not-allowed',

  variants: {
    size: {
      normal: 'h-10.5 px-4 py-1.5 text-sm',
      small: 'h-7.5 px-4 py-1.5 text-sm',
      xsmall: 'h-5 px-2 py-1 text-[10px] capitalize',
    },

    appearance: {
      contained: 'border-none text-white',
      outlined: 'bg-transparent',
      outlined_background: '',
      outlined_white: 'border-white bg-transparent text-white',
      text: 'border-transparent bg-transparent',
      text_white: 'border-transparent bg-transparent text-white',
    },

    variant: {
      info: '',
      success: '',
      error: '',
    },

    disabled: {
      true: '',
      false: '',
    },
  },

  compoundVariants: [
    // ================= CONTAINED =================
    {
      appearance: 'contained',
      variant: 'info',
      class: 'bg-sky-700 hover:bg-sky-400 focus:bg-sky-400',
    },
    {
      appearance: 'contained',
      variant: 'error',
      class: 'border-red-500 bg-red-500 hover:bg-red-400 focus:bg-red-400',
    },
    {
      appearance: 'contained',
      variant: 'success',
      class:
        'border-emerald-700 bg-emerald-700 hover:bg-emerald-400 focus:bg-emerald-400',
    },
    {
      appearance: 'contained',
      disabled: true,
      class: 'border-slate-300 bg-slate-300 bg-none text-slate-600',
    },

    // ================= OUTLINED =================
    {
      appearance: 'outlined',
      variant: 'info',
      class: 'border-sky-500 text-sky-500 hover:bg-sky-100',
    },
    {
      appearance: 'outlined',
      variant: 'error',
      class: 'border-red-500 text-red-500 hover:bg-red-100',
    },
    {
      appearance: 'outlined',
      variant: 'success',
      class: 'border-emerald-700 text-emerald-700 hover:bg-emerald-100',
    },
    {
      appearance: 'outlined',
      disabled: true,
      class: 'border-gray-100 text-gray-300',
    },

    // ============ OUTLINED BACKGROUND ============
    {
      appearance: 'outlined_background',
      variant: 'info',
      class: 'border-sky-500 bg-sky-50 text-sky-500 hover:bg-sky-100',
    },
    {
      appearance: 'outlined_background',
      variant: 'error',
      class: 'border-red-500 bg-red-50 text-red-500 hover:bg-red-100',
    },
    {
      appearance: 'outlined_background',
      variant: 'success',
      class:
        'border-emerald-700 bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
    },
    {
      appearance: 'outlined_background',
      disabled: true,
      class: 'border-gray-100 bg-transparent text-gray-300',
    },

    // ================= TEXT =================
    {
      appearance: 'text',
      variant: 'info',
      class: 'text-sky-700 hover:bg-sky-400',
    },
    {
      appearance: 'text',
      variant: 'error',
      class: 'text-red-500 hover:bg-red-100',
    },
    {
      appearance: 'text',
      variant: 'success',
      class: 'text-emerald-700 hover:bg-emerald-100',
    },
    {
      appearance: 'text',
      disabled: true,
      class: 'text-gray-300',
    },

    // ============== TEXT WHITE ==============
    {
      appearance: 'text_white',
      disabled: true,
      class: 'opacity-60',
    },

    // ============ OUTLINED WHITE ============
    {
      appearance: 'outlined_white',
      disabled: true,
      class: 'opacity-60',
    },
  ],

  defaultVariants: {
    size: 'small',
    appearance: 'contained',
    variant: 'info',
    disabled: false,
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
