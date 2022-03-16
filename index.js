const express = require('express');

const app = express();
const port = 5000;

let project = []

app.set('view engine', 'hbs');

app.use('/public', express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res){
    res.render('index', {project});
    console.log(blogs)
});

app.get('/Contact', function(req, res){s
    res.render('Contact');
});

app.post('/Contact', function(req, res){
    let data2 = req.body;
    console.log(data2);
    
});

app.get('/myProject', function(req, res){
    res.render('myProject');
});

app.post('/myProject', function(req, res){
    let data = req.body;
    project.push(data);
    res.redirect('/')
    console.log(data);
});

app.get('/Blog', function(req, res){
    res.render('Blog');
});

app.listen(port, function(){
    console.log(`Server Berjalan di Port: ${port}`)
});