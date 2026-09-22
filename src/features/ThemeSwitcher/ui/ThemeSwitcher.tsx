import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';

interface ThemeSwitcherProps {
  className?: string;
  mobile?: boolean;
}

export const ThemeSwitcher = memo(
  ({ className, mobile }: ThemeSwitcherProps) => {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
      toggleTheme((newTheme) => {
        dispatch(saveJsonSettings({ theme: newTheme }));
      });
    }, [dispatch, toggleTheme]);
    const themeIcon = theme === Theme.DARK ? <DarkIcon /> : <LightIcon />;

    return (
      <Button
        theme={mobile ? ButtonTheme.CLEAR_INVERTED : ButtonTheme.CLEAR}
        className={classNames('', {}, [className])}
        onClick={onToggleHandler}
        aria-label={t('Сменить тему')}
      >
        {mobile ? t('Тема') : themeIcon}
      </Button>
    );
  },
);
