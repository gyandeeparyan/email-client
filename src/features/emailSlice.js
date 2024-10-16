import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEmails = createAsyncThunk(
  'email/fetchEmails',
  async (page) => {
    const response = await fetch(`https://flipkart-email-mock.now.sh/?page=${page}`);
    console.log(response);
    return response.json();
  }
);

export const fetchEmailBody = createAsyncThunk(
  'email/fetchEmailBody',
  async (id) => {
    const response = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`);
    console.log(response)
    return response.json();
  }
);

const loadPersistedState = () => {
  if (typeof window === 'undefined') return {};
  
  const savedState = localStorage.getItem('emailState');
  return savedState ? JSON.parse(savedState) : {};
};

const initialState = {
  emails: [],
  selectedEmail: null,
  loading: false,
  filter: 'all',
  currentPage: 1,
  ...loadPersistedState(),
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    markAsRead: (state, action) => {
      const email = state.emails.find(e => e.id === action.payload);
      if (email) {
        email.read = true;
        localStorage.setItem('emailState', JSON.stringify(state));
      }
    },
    toggleFavorite: (state, action) => {
      const email = state.emails.find(e => e.id === action.payload);
      if (email) {
        email.favorite = !email.favorite;
        localStorage.setItem('emailState', JSON.stringify(state));
      }
    },
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading = false;
        state.emails = action.payload.list;
      })
      .addCase(fetchEmailBody.fulfilled, (state, action) => {
        state.selectedEmail = action.payload;
      });
  },
});

export const { setFilter, markAsRead, toggleFavorite, setSelectedEmail } = emailSlice.actions;
export default emailSlice.reducer;