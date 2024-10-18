import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEmails = createAsyncThunk(
  'email/fetchEmails',
  async (page) => {
    const response = await fetch(`https://flipkart-email-mock.now.sh/?page=${page}`);
    return response.json();
  }
);

const saveToLocalStorage = (state) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('emailState', JSON.stringify(state));
    }
  };

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

const loadPersistedState = () => {
  if (typeof window === 'undefined') return {};

  const savedState = localStorage.getItem('emailState');
  return savedState ? JSON.parse(savedState) : {};
};

const initialState = {
  emails: [],
  selectedEmail: null,
  loading: false,
  filter: 'unread',
  currentPage: 1,
  totalPages: 2, // assume some default value if not provided by API
  ...loadPersistedState(), // Load from localStorage on initial load
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      saveToLocalStorage(state); // Persist state change to localStorage
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      saveToLocalStorage(state); // Persist state change to localStorage
    },
    markAsRead: (state, action) => {
      const email = state.emails.find(e => e.id === action.payload);
      if (email) {
        email.read = true;
        saveToLocalStorage(state); // Persist the updated state to localStorage
      }
    },
    toggleFavorite: (state, action) => {
      const email = state.emails.find(e => e.id === action.payload);
      if (email) {
        email.favorite = !email.favorite;
        saveToLocalStorage(state); // Persist the updated state to localStorage
      }
    },
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload;
      saveToLocalStorage(state); // Persist the selected email to localStorage
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
        saveToLocalStorage(state); // Save the fetched emails to localStorage
      })
      .addCase(fetchEmailBody.fulfilled, (state, action) => {
        state.selectedEmail = action.payload;
        saveToLocalStorage(state); // Persist the selected email body to localStorage
      })
      .addCase(fetchAndSelectEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAndSelectEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEmail = action.payload.payload; // fetchEmailBody result is nested under payload
        saveToLocalStorage(state); // Persist after fetching both emails and email body
      })
      .addCase(fetchAndSelectEmail.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter, markAsRead, toggleFavorite, setSelectedEmail, setCurrentPage } = emailSlice.actions;
export default emailSlice.reducer;
