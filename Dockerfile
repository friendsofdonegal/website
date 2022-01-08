#################################################################
# Step 1: Initial build using the `yarn build` command          #
#################################################################
# Note: Make sure the right version of node your application    #
# requires is set here and in all other build steps.            #
#################################################################
FROM node:12.18.0 as build

# Prepare the build directory
RUN mkdir -p /opt/build;

WORKDIR /opt/build

# If your build step requires environment variables too, add them here

# Copy required files
# Note: I specify each file directly here to avoid copying over
# existing /dist folder or other dev files like .env
COPY . .

RUN npm ci && npm run build


#################################################################
# Step 2: Fetch production-only dependencies                    #
#################################################################
# Note: Make sure the right version of node your application    #
# requires is set here and in all other build steps.            #
#################################################################
FROM node:12.18.0 as dependencies

RUN mkdir -p /opt/build;

WORKDIR /opt/build

COPY --from=build [ "/opt/build/dist", "./" ]

RUN npm install -g serve

ENTRYPOINT [ "serve", "-s", "/opt/build/dist" ]