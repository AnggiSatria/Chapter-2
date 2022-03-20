const express = require('express');

const app = express();
const port = 5000;


let project = []

app.set('view engine', 'hbs');

app.use('/public', express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res){
    res.render('index', {project});
});

app.get('/Contact', function(req, res){
    res.render('Contact');
});

app.get('/myProject', function(req, res){
    res.render('myProject', {project});
});

app.post('/myProject', function(req, res){
    let data = {
        pm: req.body.pm
        startdate: req.body.startdate
        enddate: req.body.enddate
        desc: req.body.desc
        node: req.body.node
        react: req.body.react
        next: req.body.next
        type: req.body.type
        image: req.body.image

    }
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

