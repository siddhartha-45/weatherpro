# weatherpro



### Project Summary:

**WeatherPro**

**Objective:**

Create a weather forecast website using Node.js, Express.js, and Firebase, which allows users to sign up, log in, and view weather information for their specified location.

**Key Features:**

1. **User Authentication:**
   - **Signup Page:** Users can create an account with a username, email, and password. Passwords are hashed before storing in Firestore to ensure security.
   - **Login Page:** Users can log in with their username and password. Successful login redirects to the weather forecast page.
   - **Password Hashing:** Utilizes bcrypt for hashing passwords.
   - **Firestore Database:** Stores user information securely.





2. **Weather Forecast:**
   - **Weather Page:** Displays weather information including temperature, description, humidity, wind speed, pressure, and visibility based on the user's specified location.
   - **Search Functionality:** Users can input their location to get the current weather information using the OpenWeatherMap API.
   - **Error Handling:** Displays an error message if an invalid location is entered.




3. **Data Storage:**
   - **Firestore Integration:** Stores weather details in the Firestore database for each search, linked to the user.



4. **User Experience:**
   - **Responsive Design:** Ensures a good user experience across different devices.
   - **CSS Styling:** Uses a custom stylesheet and FontAwesome for icons.

### File Structure:



- **HTML Files:**
  - `login.html`
  - `signup.html`
  - `weather.html`



- **JavaScript Files:**
  - `app.js` (server-side)
  - `script.js` (client-side)



- **Styles:**
  - `style.css`
  - `style1.css`


- **Node.js Packages:**
  - `express`
  - `body-parser`
  - `firebase-admin`
  - `bcryptjs`


- **Firebase Configuration:**
  - `serviceAccountKey.json` (Firebase Admin SDK configuration)



### `.gitignore` Configuration:
To keep the project clean and secure, a `.gitignore` file is used to exclude:
- `node_modules/`
- Logs (`*.log`)
- Environment variables (`.env`)
- Firebase service account key (`serviceAccountKey.json`)
- OS generated files (`.DS_Store`, `Thumbs.db`)
- VSCode settings (`.vscode/`)



### Workflow:
1. **User Registration:**
   - User signs up via the signup page.
   - User data is hashed and stored in Firestore.

2. **User Login:**
   - User logs in via the login page.
   - Credentials are verified against Firestore data.
   - Upon successful login, user is redirected to the weather forecast page.

3. **Weather Search:**
   - User enters a location to retrieve weather data.
   - Weather data is fetched from the OpenWeatherMap API and displayed.
   - Weather details are stored in Firestore for the logged-in user.

