import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { User, UserSchema } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { UserRole } from '../consts/userConsts';

const initialState: UserSchema = {
  _inited: false,
};

const demoUser: User = {
  id: '1',
  username: 'admin',
  roles: [UserRole.ADMIN],
  features: {
    isArticleRatingEnabled: true,
    isCounterEnabled: true,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
      setFeatureFlags(action.payload.features);
    },
    initAuthData: (state) => {
      const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      const user = storedUser ? (JSON.parse(storedUser) as User) : demoUser;

      state.authData = user;
      setFeatureFlags(user.features);

      if (!storedUser) {
        localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
      }

      state._inited = true;
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveJsonSettings.fulfilled,
      (state, { payload }: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = payload;
        }
      },
    );
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
