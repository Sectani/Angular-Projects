const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
// Middleware CORS
const corsOptions = {
  origin: 'http://localhost:4200', // ou '*' pour autoriser toutes les origines
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // autoriser les cookies et les en-têtes d'autorisation
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cors());

app.post("/api/cart", (req, res) => {
  cart = req.body;
  setTimeout(() => res.status(201).send(), 20);
});

app.get("/api/cart", (req, res) => {
  let cart = [];
  res.send(cart);
});

app.get("/api/products", (req, res) => {
  let products = [
    {
      productId: 1,
      productTitle: "Tablette Samsung Galaxy Tab S7 FE 12,4",
      productPrice: 4220.00,
      productImage: "https://sold.ma/wp-content/uploads/2023/08/41-NnH7seyS.jpg",
      category : "Tablet",
      productQuantity:10,
      //details:"more details about product 1",
      //description:"Une tablette puissante avec un écran de 12 pouces. Idéale pour le travail ou le divertissement."
    },
    {
      productId: 2,
      productTitle: "Ordinateur portable HP Pav15 i7-1355U 8GB 512SD W11H (845M3EA)",
      productPrice: 14100.00,
      productImage: "https://www.mies.ma/11621-home_default/ordinateur-portable-hp-15-fd0029nk-886l4ea.jpg",
      category : "Laptop",
      productQuantity:8,
      //details:"more details about product 2",
      //description:"Un ordinateur portable performant avec des spécifications avancées. Parfait pour les tâches professionnelles et le jeu."
    
    },
    {
      productId: 3,
      productTitle: "HUAWEI P smart 2019",
      productPrice: 2500.00,
      productImage: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhhmLqifGU-6wJp2PF5FaMspSxxTVl1xbeBHSyCMNNfZbhYbpZ17ZdgOJaa9JRtNtsjVgODFPekSI15v2qGHjBNEy8PsWfZs8bKUBLw1sJKqeYKF_BNq1rCJECWLn81sfMD7Iv-6aHjfQ/s700-rw/huawei-p-smart2019.jpg",
      category : "Phone",
      productQuantity:15,
      //details:"more details about product 3",
      //description:"Un smartphone élégant et abordable avec des fonctionnalités avancées. Capturez vos moments spéciaux avec sa caméra haute résolution."
   
    },
  
    {
      productId: 4,
      productTitle: "Souris gaming sans fil LIGHTSPEED Logitech G502 (910-005568)",
      productPrice: 1500.00,
      productImage: "https://evotrading.ma/wp-content/uploads/2023/09/souris-gaming-sans-fil-lightspeed-logitech-g502.jpg",
      category: "Accessories and Peripherals",
      productQuantity:1,
      //details:"more details about product 4",
      //description:"Un smartphone haut de gamme offrant des performances exceptionnelles. Actuellement en rupture de stock, mais vérifiez régulièrement les mises à jour.",
    },
    {
      productId: 5,
      productTitle: "Casque sans fil à réduction de bruit JBL Tune 760NC - Noir",
      productPrice: 1449.99,
      productImage: "https://mediazone.ma/uploads/images/products/12556/12556-RTc9R6p0.jpg",
      category: "Accessories and Peripherals",
      productQuantity:10,
      //details:"more details about product 5",
      //description:"Découvrez une expérience audio exceptionnelle avec le Casque JBL Bluetooth. Grâce à sa technologie Bluetooth avancée, ce casque offre une connectivité sans fil transparente avec vos appareils préférés, tels que smartphones, tablettes et ordinateurs, garantissant une liberté de mouvement totale. Plongez-vous dans un monde de sonorité immersive grâce à la renommée de la qualité audio JBL, qui offre une restitution claire et équilibrée avec des basses percutantes et des aigus nets"
    },
    
  ];
  res.send(products);
});

app.get("/api/users", (req, res) => {
  let users = [
    {
      userId : 1,
      firstName : "abdesselam",
      lastName : "sectani",
      age : 21,
      email : "a.sectani2019@gmail.com",
      password : "1234",
      role : "admin",
    },
    {
      userId : 2,
      firstName : "aymane",
      lastName : "houri",
      age : 21,
      email : "aymane.houri2024@gmail.com",
      password : "1234",
      role : "member",
    },
    {
      userId : 3,
      firstName : "nouhyla",
      lastName : "chkhonti",
      age : 34,
      email : "nouhyla.chkhonti@gmail.com",
      password : "1234",
      role : "member",
    },
  ];
  res.send(users);
});

const port = 3000;

app.listen(port, () => console.log(`API Server listening on port ${port}`));