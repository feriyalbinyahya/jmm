
# Desa Raya App

This is a project to build a Desa Raya mobile application using React Native. The Desa Raya application is a mobile application that has features





## Requirements

- **Setup Environtment:** React Native, Android Studio, React Native CLI, JDK, Node, Xcode, Cocoapods
- **Thrid Party:** Google Service (Geocoding API, Maps SDK Android, Service Usage API)
- **Library:** Redux, Moment, React Native Vision Camera, React Native CN Quill (For Webview Editor), Lottie (Splash Screen), React Native Maps



## Installation

Make sure you have prepared the environment for application development using React Native. For details, check https://reactnative.dev/docs/set-up-your-environment#:~:text=You%20will%20need%20Node%2C%20the,React%20Native%20app%20for%20Android.

Clone project or download ZIP folder project. Go to root folder 'Desaraya' and then install dependencies.

```bash
  cd Desaraya
  npm install
```
#### How to Run

For Android

If you using Android studio, open the folder and wait for sync the project. Open your simulator device and then run the 'App'.

beside that you should run metro by type in terminal
```bash
  npx react-native start
```

For IOS

Go to terminal and go to /ios from project folder. Execute this command
```bash
  pod install
```

You can open file .xcodeproj after open folder from Xcode and wait for build and sync files. After that you can run the App by select the target and device simulator.

## Prerequisites

- [Node.js > 20](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Visual Studio Code](https://code.visualstudio.com/)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [axios](https://github.com/axios/axios) for networking.
- [prop-types](https://github.com/facebook/prop-types) to type-check our components exposed properties.
- [react-native-config](https://github.com/luggit/react-native-config) to manage envionments.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [react-native-localization](https://github.com/stefalda/ReactNativeLocalization) for string localization.
- [react-native-mmkv-storage](https://github.com/ammarahm-ed/react-native-mmkv-storage#readme) as storage solution.
- [redux](https://redux.js.org/) for state management.
- [redux-persist](https://github.com/rt2zz/redux-persist) as persistance layer.
- [redux-thunk](https://github.com/gaearon/redux-thunk) to dispatch asynchronous actions.
- [jest](https://facebook.github.io/jest/) and [react-native-testing-library](https://callstack.github.io/react-native-testing-library/) for testing.

## Usage

#### Use Template button

Click the "Use this template" button above the file list, then use the Owner drop-down menu, and select the account you want to own the repository. Creating a repository from a template has the following advantages:

- A repository created from a template starts with a single commit.
- Commits to a repository created from a template do appear in your contribution graph.
- Creating a repository from a template starts a new project quickly.

### Option 1: Using React-Native-Rename

You can start by cloning this repository and using [react-native-rename](https://github.com/junedomingo/react-native-rename). In the current state of this project, it should give you no issues at all, just run the script, delete your node modules and reinstall them and you should be good to go.

Keep in mind that this library can cause trouble if you are renaming a project that uses `Pods` on the iOS side.

After that you should proceed as with any javascript project:

- Go to your project's root folder and run `npm install`.
- If you are using Xcode 12.5 or higher got to /ios and execute `pod install --`repo-update`
- Run `npm run ios` or `npm run android` to start your application!

(Using yarn: `yarn ios` or `yarn android`)

Note: Please read the Setup environments section that is below in this file for more information about the execution scripts.

### Option 2: Copy the structure to your project

If you want to roll on your own and don't want to use this as a template, you can create your project and then copy the `/src` folder (which has all the code of your application) and update your `index.js`.

Keep in mind that if you do this, you'll have to **install and link** all dependencies (as well as adding all the necessary native code for each library that requires it).

## Folder structure

This template follows a very simple project structure:

- `src`: This folder is the main container of all the code inside your application.
  - `services`: This folder contains all function that can be call to certain endpoint.
  - `assets`: Asset folder to store all images, vectors, etc.
  - `components`: Folder to store any common component that you use through your app (such as a generic button)
  - `utils`: Folder to store any kind of utils/functions that you have.
  - `route`: Folder that contain routing component.
  - `app`: Folder that contains all your application screens/features.
    - `[...]Screen`: Each screen should be stored inside its folder and inside it a file for its code and a separate one for the styles and tests.
  - `redux`: Folder to put all redux middlewares and the store.
  - `theme`: Folder to store all the styling concerns related to the application theme.
  - `App.js`: Main component that starts your whole app.
  - `index.js`: Entry point of your application as per React-Native standards.

## Setup environments

### Using scripts from console

The template already has scripts to execute the project calling a specific environment defined into the package.json file. Keep in mind that if you are going to create new `envs` you have to define the script to build the project properly.

To define which env you want to use, just keep the structure `yarn [platform]: [environment]`


DEV: `npm ios` or `npm android`

STG: `npm ios:staging` or `npm android:staging`

PROD: `npm ios:prod` o `npm android:prod`

Also, you can use npm following the same rule as before: `npm run ios:staging`

Modify the environment variables files in root folder (`.env.development`, `.env.production` and `.env.staging`)


#### Android

A map associating builds with env files is already defined in `app/build.gradle` you can modify or add environments if needed.

For multiple enviroments to work you would need to change `-keep class [YOUR_PACKAGE_NAME].BuildConfig { *; }` on `proguard-rules.pro` file.

#### iOS

The basic idea in iOS is to have one scheme per environment file, so you can easily alternate between them.

To create a new scheme:

- In the Xcode menu, go to Product > Scheme > Edit Scheme
- Click Duplicate Scheme on the bottom
- Give it a proper name on the top left. For instance: "qa"
- Then edit the newly created scheme to make it use a different env file. From the same "manage scheme" window:

  Expand the "Build" tab on the left menu
  - Click "Pre-actions", and under the plus sign select "New Run Script Action"
  - Where it says "Type a script or drag a script file", type: `echo ".env.qa" > /tmp/envfile` replacing `.env.qa` with your file.
- Also, you will need to select the executable for the new schema:

  Expand the "Run" tab on the left menu
  - Under the "Executable" dropdown select the ".app" you would like to use for that schema

## Generate production version

These are the steps to generate `.apk`, `.aab` and `.ipa` files

### Android

1. Generate an upload key
2. Setting up gradle variables
3. Go to the android folder
4. Execute `./gradlew assemble[Env][BuildType]`

Note: You have three options to execute the project
`assemble:` Generates an apk that you can share with others.
`install:` When you want to test a release build on a connected device.
`bundle:` When you are uploading the app to the Play Store.

For more info please go to https://reactnative.dev/docs/signed-apk-android

### iOS

1. Go to the Xcode
2. Select the schema
3. Select 'Any iOS device' as target
4. Product -> Archive

For more info please go to https://reactnative.dev/docs/publishing-to-app-store

## Styleguide

For coding styling, we decided to go with ESLint and [React Native community's styleguide](https://github.com/facebook/react-native/tree/master/packages/eslint-config-react-native-community#readme).

# How to use it

The idea of this section is to explain how the template composition is the best and easiest to use when you try to use well-formed, architectures, especially using redux flow.

The template follows a simple and convenient exporting pattern. The folder index exposes the resources, allowing to import all from the same path.

With that in mind, we are going to look at each folder to explain how to use it.

## Components

Components are the basic blocks of a react native application, but since we​​ aim to minimize development complexity, all the components are at the same nesting level.

Another important thing is the use of propTypes to check the kind of data that your components need to work properly. If the component receives some data from others, the type of these props must be defined, and in case you need it the default value of the property too.

### Static resources:

To keep an application scalable and organized, the global static resources that are used in the application have to be created in a specific file.


## Redux

Once the components are defined, they are tied to the management of information through the application. For this, Redux is implemented with the store-reducer-action structure as usual, however, not only the data is handled through the actions but the success and error responses are also defined by the same form.

### Controllers folder and API connection handler

To keep the networking layer simple, the template uses a single Axios instance in the `Request.js`. It uses interceptors to define common side effects for the responses.

When you need communication with a service you have to create a function to manage the operation and grouping according to the kind of transaction inside a controller file, please keep all of those inside the controllers' folder.

While the data transfer between the API and the app is working you must use the success and error actions that help you to catch the result of the operation. With this method, you can track the interaction through the redux store. This is useful because you can create behaviors based on those states in a quick and simple way

### Redux folders

4 folders divide the redux work

- Store: Here you define the store shape and you can configure the persistReducer and middlewares.
- Actions: Remember to create the file and the corresponding test for each action classification. Here you define actions for success and error scenarios.
- Reducers: You have the error and success reducers by default. Create the other classifications and try to keep simple each file. Here you modify the store.
- Selectors: Create one file for each action classification. Here you define what part of the store you need to see in your interface.

### Figma Link
https://www.figma.com/design/aTOXJnNa0ZQaLozD27pyDC/DesaRaya?t=liEs8ilXJGi57g9Q-0