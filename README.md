# 🎬 Movie Search & Trending App

[](https://reactjs.org/)
[](https://vitejs.dev/)
[](https://appwrite.io/)
[](https://opensource.org/licenses/MIT)

A modern movie search web application built with **React**, integrated with **The Movie Database (TMDB) API** for real-time search and **Appwrite** for tracking and displaying trending movies based on user searches.

-----

## 🖼️ Live Demo

Check out the live application:

> ### [https://movie-app-roan-beta-59.vercel.app/](https://movie-app-roan-beta-59.vercel.app/)

*(Note: The demo uses shared Appwrite database, so trending results will be influenced by all users.)*

-----

## 🚀 Features

  - 🔍 **Real-time Movie Search**: Instantly search thousands of movies using the TMDB API.
  - 📈 **Trending Movies**: See the top 5 most-searched movies, with data persisted via Appwrite.
  - ⌛ **Optimized Performance**: Debounced input reduces unnecessary API calls, ensuring a smooth experience.
  - 📊 **Persistent Data**: Appwrite integration for a robust backend to track trending data.
  - 🌐 **Responsive UI**: A clean and modern user interface that looks great on any device.

-----

## 🛠️ Tech Stack

  - **Frontend**: React, Vite
  - **API**: TMDB REST API
  - **Backend Services**: Appwrite Cloud (Database)
  - **Utilities**: Axios, use-debounce

-----

## 🔧 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### 1\. Clone the Repository

```bash
git clone https://github.com/mustafa-ayyub/Movie-app.git
cd Movie-app
```

### 2\. Install Dependencies

Install the required npm packages.

```bash
npm install
```

### 3\. Environment Setup

Create a `.env` file in the root of your project and add your API keys and Appwrite configuration details.

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

### 4\. Appwrite Platform Setup

To connect the application to your Appwrite project, you need to register it as a web platform.

1.  Go to your **Appwrite Console**.
2.  Navigate to your project, then go to the **Platforms** tab.
3.  Click **Add Platform** and select **New Web App**.
4.  Give it a name (e.g., "Movie App Dev").
5.  For the **Hostname**, use `localhost` for local development. For production, you can use your domain or `*` as a wildcard.
6.  Click **Create Platform**.

-----

## 🧪 Run the App Locally

Start the development server.

```bash
npm run dev
```

Open your browser and visit: **[http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)**

-----

## 💡 How It Works

The application's logic is straightforward but effective:

1.  A user types a movie title into the search bar.
2.  The `use-debounce` hook waits for the user to stop typing before making an API call, preventing excessive requests.
3.  A request is sent to the **TMDB API** to fetch movie results matching the query.
4.  If a movie is found and clicked (or implicitly on search success), its title is logged as a document in an **Appwrite Database** collection.
5.  The "Trending" section queries the Appwrite Database to find the 5 most frequently occurring movie titles and displays them.

-----

## 📂 Folder Structure

```
MOVIE-APP/
├── public/
│   ├── hero-bg.png
│   ├── hero.png
│   ├── logo.png
│   ├── no-movie.png
│   ├── search.svg
│   └── star.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   └── Search.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── appwrite.js
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

-----

## 🔮 Future Enhancements

This project has a solid foundation. Future improvements could include:

  - [ ] **User Authentication**: Allow users to create accounts and save their favorite movies.
  - [X] **Pagination**: Implement "load more" or numbered pages for search results.
  - [ ] **Detailed Movie View**: Create a separate page or modal for movie details, trailers, and genres.
  - [ ] **Dark Mode**: Add a toggle for a dark color scheme.
  - [ ] **Improved Error Handling**: Add more specific error messages for API failures or no results.
  - [ ] **Accessibility (a11y)**: Enhance accessibility with ARIA attributes and keyboard navigation.

-----

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](https://www.google.com/search?q=LICENSE) file for more details.

-----

## 🙌 Acknowledgements

A big thank you to the following services for making this project possible:

  - [TMDB (The Movie Database)](https://www.themoviedb.org/) for their comprehensive movie API.
  - [Appwrite](https://appwrite.io/) for their powerful and easy-to-use backend services.