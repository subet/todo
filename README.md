# Full Stack Technical Test
## Murat Dikici

This is a basic todo app written in PHP and Javascript. It is build in two parts: Frontend and Backend.<br />
You can try the working demo on [my website](https://mdikici.com/todo/frontend/)

### Frontend
* **index.html** contains the todo form and the list of todos.
* **script.js** contains the frontend functionality and becames a bridge between the API endpoints and the frontend.
* **styles.css** contains all the styles.

### Backend
* **.htaccess** is routing all requests to the index.php file.
* **index.php** contains the endpoints and covers GET, POST, PUT and DELETE methods.
* **todos.json** contains the todo data.

### Prerequisites & Compatibility
* The app was tested on **PHP 8.0**, **8.2** and **8.3**.
* Your server must support .htaccess files.
* Your server must be able to return $_SERVER['REQUEST_METHOD'] and $_SERVER['PATH_INFO'] information.
* Your server must support **file_get_contents** command.

### Running the App
* **Step 1:** Copy all files into a PHP supported web server or localhost (Apache or Nginx).
* **Step 2:** Call frontend/index.php file on your browser.