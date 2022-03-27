const express = require('express');
const { get } = require('express/lib/response');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');

const db = require('./connection/db')

const app = express();
const port = 5000;


let project = []

app.set('view engine', 'hbs');

app.use(flash());
app.use(
    session({
        secret: 'rahasia',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 2 },
    })
);

app.use('/public', express.static(__dirname + '/public'));

app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res){

    db.connect(function(err,client, done){
        if(err) throw err

        console.log('Connection Sucess')

        const query = `SELECT * FROM public.tb_project`;
        client.query(query, function(err, result){
            if (err) throw err;
    
            let data = result.rows
                    let dataProject = data.map(function(data){
                        // let user_id = data.user_id;
                        // let name = data.username;
                        // let email = data.email;
        
                        // delete data.user_id;
                        // delete data.Name;
                        // delete data.Mail;
                        // delete data.author_id;
                return{
                    ...data,
                    isLogin: req.session.isLogin,
                    duration: getDistanceTime(data.start_date, data.end_date)
                }

    
            });
//             app.post('/myProject', function(req, res){
//     // let data = {
//     //     pm: req.body.pm,
//     //     startdate: req.body.startdate,
//     //     enddate: req.body.enddate,
//     //     desc: req.body.desc,
//     //     node: req.body.node,
//     //     react: req.body.react,
//     //     next: req.body.next,
//     //     type: req.body.type,
//     //     image: req.body.image, 
//     // }
//     // project.push(data);

//     let data = req.body;
//     if(data.pm == "" || data.startdate == "" || data.enddate == "" || data.desc ==""){
//         return res.redirect('/myProject')
//     }

//     db.connection(function(err, client, done){
       
//             if (err) throw err;

//             const query = `INSERT INTO tb_project(project_name, start_date, end_date, description, image, node, react, next, type)
//             VALUES('${data.pm}','${data.startdate}','${data.enddate}','${data.desc}','${data.image}','${checkboxRender(data.node)}','${data.react}','${data.next}', '${data.type}')`
            
//             client.query(query, function(err, _result){
//                 if (err) throw err;
//                 done();
//             });
//         });
        
//     res.redirect('/')
// });
            res.render('index', {project: dataProject, user: req.session.user, isLogin: req.session.isLogin});
        })
    })


    
});

app.get('/delete/:id', function(req, res){
    let id = req.params.id;
    db.connect(function(err,client, done){
        if(err) throw err

        const query = `DELETE FROM public.tb_project
        WHERE id=${id};`
        client.query(query, function(err, result){
            if (err) throw err;
            done();
        });
    });
    res.redirect('/');
});

app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

app.get('/Contact', function(req, res){
    res.render('Contact');
});

app.get('/Edit/:id', function(req, res){
    res.render('Edit');
});

app.post('/Edit/:id', function(req, res){
    
    let id = req.params.id

    let data = req.body

    db.connect(function(err,client, done){
        if(err) throw err

        const query = `UPDATE public.tb_project
        SET project_name='${data.pm}', start_date='${data.startdate}', end_date='${data.enddate}', description='${data.desc}', image='${data.image}', node='${checkbox(data.node)}', react='${checkbox(data.react)}', next='${checkbox(data.next)}', type='${checkbox(data.type)}',
        WHERE id=${id};`
        client.query(query, function(err, result){
            if (err) throw err;
            done();
        });
    });
    res.redirect('/');
    


});

app.get('/myProject', function(req, res){
    res.render('myProject', {project});
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', function (req, res) {
    const data = req.body;

    if (data.Name == '' || data.Mail == '' || data.Password == '') {
        req.flash('error', 'Please insert all field!');
        return res.redirect('/login');
    }

    db.connect(function (err, client, done) {
        if (err) throw err;

        const query = `SELECT * FROM public.tb_register WHERE email = '${data.Mail}' ;`;

        client.query(query, function (err, result) {
            if (err) throw err;


            // Check account by email
            if (result.rows.length == 0) {
                console.log('Email not found!');
                return res.redirect('/login');
            }

            // Check password
            const isMatch = bcrypt.compareSync(
                data.Password,
                result.rows[0].password
            );

            if (isMatch == false) {
                console.log('Wrong Password!');
                return res.redirect('/login');
            }

            req.session.isLogin = true;
            req.session.user = {
                id: result.rows[0].id,
                email: result.rows[0].email,
                name: result.rows[0].name,
            };

            done();
            res.redirect('/');
        });
    });

});

app.get('/register', function(req, res){
    res.render('register');
});

app.post('/register', function (req, res) {
    const data = req.body;

    if (data.Name == '' || data.Mail == '' || data.Password == '') {
        req.flash('error', 'Please insert all field!');
        return res.redirect('/register');
    }

    const hashedPassword = bcrypt.hashSync(data.Password, 10);

    db.connect(function (err, client, done) {
        if (err) throw err;

        const query = `INSERT INTO public.tb_register(
            name, email, password)
            VALUES ('${data.Name}', '${data.Mail}', '${hashedPassword}');`;

        client.query(query, function (err, result) {
            if (err) throw err;
            req.flash('success', 'Success register your account!');
            res.redirect('/login');
            done();

        });
    });
});

app.post('/myProject', function(req, res){
    // let data = {
    //     pm: req.body.pm,
    //     startdate: req.body.startdate,
    //     enddate: req.body.enddate,
    //     desc: req.body.desc,
    //     node: req.body.node,
    //     react: req.body.react,
    //     next: req.body.next,
    //     type: req.body.type,
    //     image: req.body.image, 
    // }
    // project.push(data);

    let data = req.body;
    console.log(data)
    if(data.pm == "" || data.startdate == "" || data.enddate == "" || data.desc ==""){
        return res.redirect('/myProject')
    }

    db.connect(function(err, client, done){
       
            if (err) throw err;

            const query = `INSERT INTO tb_project(project_name, start_date, end_date, description, image, node, react, next, type)
            VALUES('${data.pm}','${data.startdate}','${data.enddate}','${data.desc}','${data.image}',${checkbox(data.node)},${checkbox(data.react)},${checkbox(data.next)}, ${checkbox(data.type)})`
            
            client.query(query, function(err, result){

                if (err) throw err;

                done();
            });
        });
        
    res.redirect('/')
});

app.get('/Blog', function(req, res){
    res.render('Blog');
});


app.listen(port, function(){
    console.log(`Server Berjalan di Port: ${port}`)
});


function getFullTime(time){
    
    let month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    
    let date = time.getDate()
    let monthIndex = time.getMonth()
    let year = time.getFullYear()
    let hours = time.getHours()
    let minutes = time.getMinutes()

    let fullTime = `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`

    return fullTime
}

function getDistanceTime(part1, part2){

    let startTime = part1
    let endTime = part2

    // let timeNow = new Date()
    // let timeBlog = new Date(time)

    // console.log('Now: ', timeNow)  
    // console.log('Blog: ', timeBlog)

    let distance = new Date(part2) - new Date(part1) // milliseconds 

    let dayDistance = Math.floor(distance/( 23 * 60 * 60 * 1000 )) // convert to day 

    if(dayDistance != 0){
        return dayDistance + ' Days Ago'
    }else{
        let hourDistance = Math.floor(distance/( 60 * 60 * 1000 ))

        if(hourDistance != 0){
            return hourDistance + ' Hours Ago'
        }else{
            let minuteDistance = Math.floor(distance/(60 * 1000))

            if(minuteDistance != 0){
                 return minuteDistance + ' Minutes Ago'
            }else{
                let secondDistance = Math.floor(distance/1000)
                return secondDistance + ' Second Ago'
            }
           
        }
        
    }
    
}

function checkbox(par1){
    if( par1 == 'true' ){
        return true
    }else{
        return false
    }
}

