# MovieBox - Movie Discovery Web Application

![MovieBox Logo](./public/logo.svg)

Welcome to MovieBox, a movie discovery web application built with Next.js. MovieBox allows users to search for movies, view movie details, and save their favorite movies.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/moviebox.git
   ```

2. Change your working directory to the project folder:

   ```bash
   cd moviebox
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the root directory of your project and add the following environment variables:

   ```env
   TMDB_API_KEY=your_tmdb_api_key
   ```

   Replace `your_tmdb_api_key` with your actual TMDB API key.

## Development

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

## Features

### 1. User Interface

- The application provides a visually appealing user interface designed with responsiveness in mind.
- The top 10 movies are listed on the homepage in a grid layout with movie posters, titles, and release dates.

### 2. Movie Search

- Users can search for movies by title using the search feature.
- Search results include movie posters, titles, and release dates.
- A loading indicator is displayed while fetching search results.

### 3. Movie Details

- When visiting the route `/movies/:id`, where `:id` is the movie ID, users can view detailed information about the selected movie.
- Information displayed includes the movie title, release date (in UTC), runtime (in minutes), and an overview of the movie.

### 3. Rate Movie

- A star rating is located on the movie details page where users can rate each movies with a star.
- No database integration for this just a  basic User interaction

### 3. Mark Favourite

 *incomplete* -

- You can click on the favourites icon on eacch movi card to add it as a favourite
- No database integration for this just a  basic User interaction

### 4. API Integration

- The application consumes the TMDB API to fetch movie data.
- It uses the provided API endpoints to fetch movie details by ID.

### 5. Error Handling

- The application implements error handling to provide meaningful error messages in case of API failures or other issues.

## Deployment

The application is deployed and hosted on  [Vercel](https://www.netlify.com/). You can access it [here](https://hngxmoviebox.vercel.app/).

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the original repository.
