const express = require('express');
const mysql = require('mysql');

const path = require('path');
const app = express()
const PORT = 8080;

// serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// mysql connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'vaishnavi_grocery_world'
});

db.connect(err => {
    if (err) {
        console.error('❌ MySQL Connection Failed:', err);
        return
    }
    console.log('✅ Connected to MySQL Database');
});

// landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// home page
app.get('/home', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) throw err;
        console.log(results);
        let productHTML = results.map(product => `
            <div class="product">
                <img src="${product.image_url}" alt="${product.p_name}"/>
                <h3>${product.p_name}</h3>
                <p>${product.p_price}</p>
            </div>
        `).join('');

        res.send(`
            <!DOCTYPE html>
            <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <!-- bootstrap v4 -->
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"
                        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
                    <link rel="stylesheet" href="/style.css">
                </head>

                <body>
                    <!-- navbar -->
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a href="#" class="navbar-brand">Grocery World</a>
                        <div class="collapse navbar-collapse">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item"><a href="/" class="nav-link">Landing</a></li>
                                <li class="nav-item"><a href="/home" class="nav-link">Home</a></li>
                                <li class="nav-item"><a href="/contact" class="nav-link">Contact</a></li>
                            </ul>
                        </div>
                    </nav>
                    
                    <!-- header -->
                    <div class="jumbotron jumbotron-fluid text-center">
                        <h1 class="display-4">Welcome To Grocery World</h1>
                        <p class="lead">Your One-Stop Online Grocery Shop!</p>
                    </div>

                    <!-- product section -->
                    <div class="container">
                        <div class="row justify-content-around">
                            ${results.map(product => `
                                <div class="col-md-3 mb-4">
                                <div class="card h-100 shadow">
                                    <img src="${product.image_url}" class="card-img-top" alt="${product.p_name}" style="height: 250px; object-fit: cover;">
                                    <div class="card-body text-center">
                                        <h5 class="card-title">${product.p_name}</h5>
                                        <p class="card-text">Price: $${product.p_price}</p>
                                    </div>
                                </div>
                            </div>
                            `)}
                        </div>
                    </div>
                    
                                        <!-- footer -->
                    <footer class="bg-dark text-white text-center p-3 mt-4">
                        © 2026 Vaishanvi's Grocery World
                    </footer>
                </body>
            </html>
        `)
    })
});

// contact page
app.get('/contact', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <!-- bootstrap v4 -->
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"
                    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
                <link rel="stylesheet" href="/style.css">
            </head>

            <body>
                <!-- navbar -->
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a href="#" class="navbar-brand">Grocery World</a>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item"><a href="/" class="nav-link">Landing</a></li>
                            <li class="nav-item"><a href="/home" class="nav-link">Home</a></li>
                        </ul>
                    </div>
                </nav>

                   <!-- contact -->
                <div class="container mt-5">
                    <h2 class="text-center mb-4">Contact Us</h2>
                    <form action="/contact" method="POST">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" name="name" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" name="email" class="form-control" required>
                        </div>
                        
                        

                                                <div class="form-group">
                            <label for="phone">Phone</label>
                            <input type="text" name="phone" class="form-control" required>
                        </div>

                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea name="message" row="5" class="form-control" required></textarea>
                        </div>

                        <button class="btn btn-success btn-block">Send Message</button>
                    </form>
                </div>

                                <!-- footer -->
                <footer class="bg-dark text-white text-center p-3 mt-4">
                    © 2026 Vaishanvi's Grocery World
                </footer>
            </body>
        </html>
    `);
});

// start eerver
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// http://localhost:8080