# Google Drive Real-Time File Monitor
===================================

What does this program do?
--------------------------

This program allows you to monitor changes to a specific file on Google Drive in real-time. You can use it to get notified whenever new users are added to the file or when users are removed from the file. The program also provides the ability to list files on your Google Drive and download files from there.

How to execute the program?
---------------------------

### Prerequisites:

*   Node.js installed on your computer. If you don't have it, download and install it from [Node.js website](https://nodejs.org).

### Step-by-step instructions:

1.  **Download the code:**
    
    Download the code from the GitHub repository by clicking on the "Code" button and then selecting "Download ZIP". Unzip the downloaded file to a location on your computer.
    
2.  **Install dependencies:**
    
    Open your computer's terminal or command prompt and navigate to the folder where you unzipped the code.
    
    bashCopy code
    
    `cd path/to/the/unzipped/folder`
    
    Now, install the required dependencies by running the following command:
    
    Copy code
    
    `npm install`
    
3.  **Setup Google Drive API:**
    
    Before running the program, you need to set up the Google Drive API and get the required credentials. Follow these steps:
    
    *   Go to the [Google Cloud Console](https://console.cloud.google.com/).
    *   Create a new project (you can name it whatever you like).
    *   In the "APIs & Services" > "Dashboard" section, click on "+ ENABLE APIS AND SERVICES".
    *   Search for "Google Drive API" and click on it.
    *   Click on the "Enable" button to enable the API for your project.
    *   In the "APIs & Services" > "Credentials" section, click on "+ CREATE CREDENTIALS".
    *   Select "OAuth client ID" as the credential type.
    *   Choose "Desktop app" as the application type, and give it a name (e.g., "Google Drive Real-Time Monitor").
    *   Click on "Create" and note down the generated client ID and client secret.
4.  **Configure the program:**
    
    Open the file `index.js` in a text editor (like Notepad or Visual Studio Code).
    
    *   Replace `'YOUR_CLIENT_ID'` with your Google Cloud Platform project's client ID (from the previous step).
    *   Replace `'YOUR_CLIENT_SECRET'` with your Google Cloud Platform project's client secret (from the previous step).
    *   Replace `'YOUR_REDIRECT_URL'` with the URL where you want users to be redirected after authentication. For example, `'http://localhost:3000/callback'`.
5.  **Run the program:**
    
    Open your computer's terminal or command prompt and navigate to the folder where you have the code.
    
    bashCopy code
    
    `cd path/to/the/unzipped/folder`
    
    Now, run the program with the following command:
    
    Copy code
    
    `node index.js`
    
6.  **Authenticate and Monitor:**
    
    *   After running the program, it will display a URL like `http://localhost:3000/auth` in the terminal. Copy and paste this URL into your web browser.
    *   You will be redirected to a Google login page. Log in with your Google account.
    *   Grant permission to the application to access your Google Drive.
    *   Once you authorize the application, you will see a message in your browser saying "Authentication successful!".
    *   The program will start monitoring the file. You should see a message in the terminal saying "Watching for changes...".
7.  **Get real-time updates:**
    
    Now, any time a change occurs to the file you specified in the program (new users added or removed), you will receive real-time updates in the terminal. These updates will be displayed automatically whenever the file is modified.
    

That's it! You have successfully set up and executed the Google Drive Real-Time File Monitor program. You can now monitor changes to the specific file on your Google Drive and receive real-time notifications for new users and removed users. Happy monitoring!