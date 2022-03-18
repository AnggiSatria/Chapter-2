const express = require('express');

const app = express();
const port = 5000;

const isLogin = true;

let project = []

app.set('view engine', 'hbs');

app.use('/public', express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res){
    let dataProject = project.map(function(data)){
        return {
            ...data, 
            isLogin,
        }
    }

    res.render('index', {isLogin, project});
});

app.get('/Contact', function(req, res){
    res.render('Contact');
});

app.get('/myProject', function(req, res){
    res.render('myProject', {project});
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

console.log(project);

app.listen(port, function(){
    console.log(`Server Berjalan di Port: ${port}`)
});
