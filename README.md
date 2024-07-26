# Three.js and GSAP Project

# Live Demo
You can view the live demo of the project https://main--threejsglsl.netlify.app/.

## Overview

This project demonstrates how to integrate Three.js and GSAP (GreenSock Animation Platform) to create interactive web animations. The setup includes Three.js for 3D rendering and GSAP for smooth animations. The project includes a canvas with images that animate on user interaction.

## Project Structure

- `index.html`: The main HTML file containing the structure and content of the page.
- `style.css`: Contains the styling for the project.
- `main.js`: The JavaScript file that initializes Three.js, loads images, and handles animations using GSAP.
- `fragment.glsl`: GLSL fragment shader code for custom image effects.
- `vertex.glsl`: GLSL vertex shader code for custom geometry transformations.

## Prerequisites

- A modern web browser with WebGL support.
- Node.js (optional, for local development with a local server).

## Getting Started

### Clone the Repository

Clone this repository to your local machine using Git:

```bash
git clone https://github.com/RajshreeAdikane/Three.js-and-Gsap.git
cd Three.js-and-Gsap

Usage
Open the Project: Open the index.html file in a web browser.
Interact with the Page: Hover over the links on the right side to see the image animations triggered by GSAP.
Key Features
Three.js: Used for rendering 3D graphics and handling shaders.
GSAP: Used for creating smooth animations when interacting with the links.
Custom Shaders: fragment.glsl and vertex.glsl contain custom GLSL code for image effects.
