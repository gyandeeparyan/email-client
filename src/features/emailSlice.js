import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEmails = createAsyncThunk(
  'email/fetchEmails',
  async (page) => {
    const response = await fetch(`https://flipkart-email-mock.now.sh/?page=${page}`);
    return response.json();
  }
);

export const fetchEmailBody = createAsyncThunk(
  'email/fetchEmailBody',
  async (id) => {
    const response = await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`);
    return response.json();
  }
);

export const fetchAndSelectEmail = createAsyncThunk(
  'email/fetchAndSelectEmail',
  async ({ page, emailId }, { dispatch }) => {
    await dispatch(fetchEmails(page));
    return dispatch(fetchEmailBody(emailId));
  }
);

const saveToLocalStorage = (state) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('emailState', JSON.stringify(state));
    }
  };

const loadPersistedState = () => {
    if (typeof window === 'undefined') return {};
  
    try {
      const savedState = localStorage.getItem('emailState');
      if (!savedState) return {};
  
      const parsedState = JSON.parse(savedState);
      // Add version checking if needed
      if (parsedState.version !== 'your-current-version') {
        localStorage.removeItem('emailState');
        return {};
      }
      return parsedState;
    } catch (error) {
      console.error('Error loading persisted state:', error);
      return {};
    }
  };

const initialState = {
  emails: [],
  selectedEmail: null,
  loading: false,
  filter: 'unread',
  currentPage: 1,
  totalPages: 2, 
  ...loadPersistedState(),
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      saveToLocalStorage(state); 
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      saveToLocalStorage(state); 
    },
    markAsRead: (state, action) => {
      const email = state.emails.find(e => e.id === action.payload);
      if (email) {
        email.read = true;
        saveToLocalStorage(state);       }
    },
    toggleFavorite: (state, action) => {
      const email = state.emails.find(e => e.id === action.payload);
      if (email) {
        email.favorite = !email.favorite;
        saveToLocalStorage(state);
      }
    },
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload;
      saveToLocalStorage(state); 
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
        saveToLocalStorage(state); 
      })
      .addCase(fetchEmailBody.fulfilled, (state, action) => {
        state.selectedEmail = action.payload;
        saveToLocalStorage(state); 
      })
      .addCase(fetchAndSelectEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAndSelectEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEmail = action.payload.payload; 
        saveToLocalStorage(state); 
      })
      .addCase(fetchAndSelectEmail.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter, markAsRead, toggleFavorite, setSelectedEmail, setCurrentPage } = emailSlice.actions;
export default emailSlice.reducer;
