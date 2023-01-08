## Tech Choices

This is the frontend for a simple messenger application using [Next.js](https://nextjs.org/). I opted to use Next.js since it is largely the de facto way to use React, which is what Guild uses to my understanding. I’ve been predominately using Svelte over the past couple years and am most comfortable with it in turn, but I think this will be a good learning opportunity to continue reacquainting myself with React and Next.js. There are a number of additional packages we’ll pull in to help us focus on the task at hand. I listed them below with a small explanation of each. I’ll omit the obvious ones like ESLint, Prettier, TypeScript, and their corresponding dependencies/plugins.

### TailwindCSS

Quick styling via classes so we can focus more on the logic of the app

### DaisyUI

A CSS-only package built on Tailwind to provide some default component styles

### Heroicons

Supply general icons

### React Textarea Autosize

An automatically resizing textarea for our chat input, as building one from scratch would violate our time constraints

### Cookies Next

Easily access and set cookies on both the client and server, perfect for our pseudo-auth implementation

### Socket.io Client

Our server uses Socket.io as an implemention for WebSockets, so we need the corresponding client package

## Description

Please refer to the corresponding [backend repo README](https://github.com/RyleeT/guild-backend) for more info regarding the overarching design of the application. There are a couple frontend-specific implementations worth discussing as well. As noted in the aforementioned README, authentication simply uses usernames and assumes the user is authenticated. To track this on the frontend, we create a cookie which stores the username. This allows us to maintain the user’s authentication status across sessions and check it in SSR to preload certain data. If this cookie is already present on the login page, the user will be redirected to the home page. Conversely, having no cookie or an invalid one will result in a redirection to the login page.

To manage state, I went with React’s Context API. Specifically, there are account and WebSocket providers which wrap the entire application, so we always have access to current user data and the WebSocket client. I also added a context for just the chat component, which allows us to track the current chat room, users, and the data pertaining to each chat room. We’d likely want something more robust than this in a production application, but it will do for our use case.

## Future Considerations

- Add URL routing for chat rooms. This would allow directly navigating to given conversations and SSR for rooms/messages, amongst other things. We could also move parts of the Chat component like the UserList into the layout and generally structure the relevant components in a cleaner manner
- Implement a more comprehensive state management solution than just using the Context API across the board. This should include some sort of caching solution as well
- Fetch and store rooms more robustly to reduce redundant data fetching and better facilitate simultaneous conversations
- Add responsive styling, things are only configured to look acceptable on desktop for now
- Scroll to bottom of MessageList after message is sent
- Start at bottom of chat when it is overflowing
- Greatly improve UI in general
- Implement better error handling to gracefully manage things like WebSocket failures and login issues, then notify the user accordingly
- Add a real authentication system
- Add automated tests, especially around the logic for the Chat component
- Add .env.local back to .gitignore. It is currently included in the repo for minimal configuration since it doesn't include sensitive data

## Installation

```bash
$ npm install
```

## Running the app

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
