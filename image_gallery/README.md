# Image Gallery Project Documentation

## Stage Three: Drag-and-Drop Image Gallery

### Task Overview

The objective of this task is to develop a fully functional and responsive image gallery that showcases a collection of images in an aesthetically pleasing manner. Users should be able to log in to the gallery, and authenticated users should have the ability to use the drag-and-drop feature, allowing them to effortlessly rearrange images within the gallery.

### Project Setup

To set up the project, follow these steps:

1. **Clone this repository:**

   ```bash
   git clone https://github.com/goodness5/hngx.git

   cd hngx
   cd image_gallery
   
   ```

2. **Install Required Libraries:**

     ```bash
     npm install 
     ```

### Project Structure

- `src/app/`: Contains the different pages of the application.
- `components/`: Houses various reusable components used in the project.
- `globals.css/`: Contains global styles and CSS files.
- `public/`: Stores static assets like images.

### Available Routes

1. `accounts/login`: Landing page with authentication form.
2. `accounts/signup`: page with signup form.
3. `/dashboard`: Authenticated user's dashboard with the image gallery.

### Authentication

Users can log in with the following credentials:

- **Username:** <user@example.com>
- **Password:** 1Password

Authentication is handled using a Flask API endpoint deployed on Render.

### Image Display

The gallery displays a grid layout of images in a visually appealing manner, ensuring consistent spacing and sizing. Each image is accompanied by a tag.

### Loading State

A loading state is implemented for when images are not ready for display. This can be observed through either a skeleton loader or a loading spinner when the page is loading.

### Search Functionality

A search field is provided, allowing users to filter the image list based on the tags associated with the images.

### Drag-and-Drop

Users have the ability to drag and drop images within the gallery, providing a seamless and interactive experience.

### User-friendly Feedback

Smooth animations and visual cues are integrated to offer feedback during drag-and-drop interactions, enhancing the user experience.

### Responsive Design

The gallery is designed to be responsive and functional on various devices, including desktop computers, tablets, and mobile phones.

### Design Flexibility

While adhering to the specified requirements, there is creative freedom to design a unique and visually appealing gallery.

### Running the Project

1. Start the development server:

   ```bash
   npm run dev
   ```

   Access the application at [http://localhost:3000](http://localhost:3000).

2. Log in using the provided credentials.

3. Explore the drag-and-drop image gallery!

### Libraries Used

- [React Beautiful DND](https://github.com/atlassian/react-beautiful-dnd)

- [Tailwind CSS](https://tailwindcss.com/)

```
