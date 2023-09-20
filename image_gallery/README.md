# Setting Up HTTPS for Next.js Development

This guide will walk you through the steps to enable HTTPS for your Next.js application during development using `http-server` and self-signed SSL certificates.

## Prerequisites

1. Node.js and npm must be installed on your machine.

   # Image Gallery Documentation

## Stage Three: Drag-and-Drop Image Gallery

### Task Overview
The objective of this task is to develop a fully functional and responsive image gallery that showcases a collection of images in an aesthetically pleasing manner. Users should be able to log in to the gallery and authenticated users should have the ability to use the drag-and-drop feature, allowing them to effortlessly rearrange images within the gallery.

### Requirements

#### Simple Authentication
Users can log in with the following credentials:
- **Username:** user@example.com
- **Password:** 1Password

The authentication form fields have been properly validated, and meaningful error messages have been set up. For the backend, you can utilize solutions like NextAuth, Auth0, Clerk, Firebase, or any other preferred authentication method.

#### Image Display
The gallery displays a grid layout of images in a visually appealing manner, ensuring consistent spacing and sizing. Each image is accompanied by a tag.

#### Loading State
A loading state is implemented for when images are not ready for display. This can be observed through either a skeleton loader or a loading spinner when the page is loading.

#### Search Functionality
A search field is provided, allowing users to filter the image list based on the tags associated with the images.

#### Drag-and-Drop
Users have the ability to drag and drop images within the gallery, providing a seamless and interactive experience.

#### User-friendly Feedback
Smooth animations and visual cues are integrated to offer feedback during drag-and-drop interactions, enhancing the user experience.

#### Responsive Design
The gallery is designed to be responsive and functional on various devices, including desktop computers, tablets, and mobile phones.

#### Design Flexibility
While adhering to the specified requirements, there is creative freedom to design a unique and visually appealing gallery.

### Acceptance Criteria

#### Functional Authentication
The authentication process is fully functional, allowing users to log in with the provided credentials.

#### Drag-and-Drop Feature
The drag-and-drop feature is fully implemented, enabling users to rearrange images within the gallery seamlessly.

#### Responsiveness
The design of the gallery is responsive and adapts smoothly to various screen sizes, including desktops, tablets, and mobile devices.

#### User Experience
The design emphasizes an intuitive and visually pleasing experience, ensuring smooth navigation and operation without any performance issues.

#### Image Display
All images are displayed with consistent spacing and sizing, creating a visually cohesive gallery.

---

<!-- # FYI
   ```bash
   http-server -a localhost -p 3000 --ssl --cert localhost-cert.pem --key localhost-key.pem
   ```

   - `-a localhost`: Specifies the host to use.
   - `-p 3000`: Specifies the port (you can change it if you prefer a different port).
   - `--ssl`: Enables HTTPS.
   - `--cert` and `--key`: Specify the paths to your SSL certificate and key files. -->


