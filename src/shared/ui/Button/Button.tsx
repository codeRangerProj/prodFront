import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline_red',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      theme = ButtonTheme.OUTLINE,
      children,
      disabled,
      fullWidth,
      square,
      size = ButtonSize.M,
      ...otherProps
    } = props;

    const mods: Mods = {
      [cls[theme]]: true,
      [cls.square]: square,
      [cls[size]]: true,
      [cls.disabled]: disabled,
      [cls.fullWidth]: fullWidth,
    };

    return (
      <button
        ref={ref}
        type="button"
        data-testid="storybook-button"
        className={classNames(cls.Button, mods, [className])}
        disabled={disabled}
        {...otherProps}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
