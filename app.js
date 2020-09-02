var express    = require('express'),
    bodyParser = require('body-parser'),
    request    = require('request')
    app        = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Routing 

app.get('/', function (req, res) {
    res.render('landing');
});

app.get('/home', function (req, res) {
    res.render('home');
});


app.get("/result", function (req, res) {
    var query = req.query.search;
    var url = "https://api.spoonacular.com/recipes/complexSearch?query=" + query + "&apiKey=785125ae78a34bd78bbccf5f135f6da9";
    request(url, function (error, response, body) {
        var data = JSON.parse(body);
        res.render('result', { data: data });
    })
});

app.get('/recipe/:id', function (req, res) {
    var query = req.params.id;
    var url1 = "https://api.spoonacular.com/recipes/" + query + "/information?includeNutrition=false&apiKey=785125ae78a34bd78bbccf5f135f6da9";
    // var url2 = "https://api.spoonacular.com/recipes/" + query + "/nutritionWidget?defaultCss=true";
    request(url1, function (error, response, body1) {
        var data = JSON.parse(body1);
        res.render('recipe',{data:data});
    })
    
});

app.get('/random', function (req, res) {
    
    var url1 = "https://api.spoonacular.com/recipes/random?number=10&apiKey=785125ae78a34bd78bbccf5f135f6da9"
    
    request(url1, function (error, response, body1) {
        var data = JSON.parse(body1);
        res.render('random',{data:data});
    })
    
});

app.get('/nutrition/:id', function (req,res) {
    var query = req.params.id;
    var url = "https://api.spoonacular.com/recipes/" + query + "/nutritionWidget?defaultCss=true";
    request(url, function (error, response, body1) {
        res.render('nutrition',{body1:body1});
    })
})

app.get('/about', function (req, res) {
    res.render('about');
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});