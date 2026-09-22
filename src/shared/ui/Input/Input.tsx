import React, {
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly' | 'rows' | 'onFocus' | 'onBlur' | 'onSelect'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
  multiline?: boolean;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    autofocus,
    placeholder,
    readonly,
    multiline,
    ...otherProps
  } = props;
  const textareaProps =
    otherProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>;

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);

  const isCaretVisible = isFocused && !readonly;

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      if (multiline) {
        textareaRef.current?.focus();
      } else {
        inputRef.current?.focus();
      }
    }
  }, [autofocus, multiline]);

  useEffect(() => {
    if (multiline && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [multiline, value]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onSelect = (
    e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCaretPosition(e.currentTarget.selectionStart || 0);
  };

  const mods: Mods = {
    [cls.readonly]: readonly,
    [cls.multiline]: multiline,
  };

  return (
    <div className={classNames(cls.InputWrapper, mods, [className])}>
      {placeholder && (
        <div className={cls.placeholder}>{`${placeholder}>`}</div>
      )}
      <div className={cls.caretWrapper}>
        {multiline ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={onChangeHandler}
            className={cls.input}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={readonly}
            onSelect={onSelect}
            rows={2}
            {...textareaProps}
          />
        ) : (
          <input
            ref={inputRef}
            type={type}
            value={value}
            onChange={onChangeHandler}
            className={cls.input}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={readonly}
            onSelect={onSelect}
            {...otherProps}
          />
        )}
        {isCaretVisible && (
          <span
            className={cls.caret}
            style={{ left: `${caretPosition * 9}px` }}
          />
        )}
      </div>
    </div>
  );
});
