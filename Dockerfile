# Stage 1: Build the React application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Receive build arguments and set them as environment variables
ARG REACT_APP_RAPID_API_KEY
ARG REACT_APP_PORTFOLIO_API_KEY
ENV REACT_APP_RAPID_API_KEY=$REACT_APP_RAPID_API_KEY
ENV REACT_APP_PORTFOLIO_API_KEY=$REACT_APP_PORTFOLIO_API_KEY

# Build the application
RUN yarn build

# Stage 2: Serve the application with Node
FROM node:18-alpine

WORKDIR /app

# Install serve to run the application
RUN yarn global add serve

# Copy the build output from the previous stage
COPY --from=build /app/build ./build

# Expose port and start application
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
