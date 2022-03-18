let projects = []

function addProject(){

    let name = document.getElementById('Name').value
    let date = document.getElementById('Date').value
    let date2 = document.getElementById('Date2').value
    let desc = document.getElementById('Desc').value
    let image = document.getElementById('Image').files[0]

    let nodeJs = document.getElementById('nodeJs').checked
    let reactJs = document.getElementById('reactJs').checked
    let nextJs = document.getElementById('nextJs').checked
    let typesScript = document.getElementById('typeScript').checked

    image = URL.createObjectURL(image)

    
    

    let project = {
        name: name,
        date: date,
        date2: date2,
        desc: desc,
        nodeJs: nodeJs,
        reactJs: reactJs,
        nextJs: nextJs,
        typesScript: typesScript, 
        image: image
    }

    console.log(nodeJs)


    projects.push(project)

    renderProject()
}

console.log(projects)

function renderProject(){
    let projectContainer = document.getElementById('Card')

    projectContainer.innerHTML = `<div class="card">
    <div class="img">
        <img src="assets/blog-img.png" alt="">
    </div>
    <div class="tittle">
        <h2>Hallo</h2>
    </div>
    <div class="duration">
        <h3>3 Month</h3>
    </div>
    <div class="card-content">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, necessitatibus.</p>
    </div>
    <div class="after-content">
        <div class="ps">
            <img src="assets/ps.png" alt="" style="width: 50px;">
        </div>
        <div class="andro">
            <img src="image/android.png" alt="" style="width: 50px;">
        </div>
        <div class="java">
            <img src="image/java2.jpg" alt="" style="width: 50px;">
        </div>
        <div class="nodejs">
            <img src="image/git.png" alt="" style="width: 50px;">
        </div>
    </div>
    <div class="button">
        <div class="button1">
            <a href="">Edit</a>
        </div>
        <div class="button2">
            <a href="">Delete</a>
        </div>
    </div>
</div>
`

    for( i = 0; i < projects.length; i++ ){
        projectContainer.innerHTML += `<div class="card">
        <div class="img">
            <img src="${projects[i].image}" alt="">
        </div>
        <div class="tittle">
            <h2>${projects[i].name}</h2>
        </div>
        <div class="duration">
            <h3>${getDistanceTime()}</h3>
        </div>
        <div class="card-content">
            <p>${projects[i].desc}</p>
        </div>
        <div class="after-content">
            <div class="ps">
                <img src="${addCheckBox(projects[i].nodeJs)}" alt="" style="width: 50px;">
            </div>
            <div class="andro">
                <img src="${addCheckBox(projects[i].reactJs)}" alt="" style="width: 50px;">
            </div>
            <div class="java">
                <img src="${addCheckBox(projects[i].nextJs)}" alt="" style="width: 50px;">
            </div>
            <div class="nodejs">
                <img src="${addCheckBox(projects[i].typesScript)}" alt="" style="width: 50px;">
            </div>
        </div>
        <div class="button">
            <div class="button1">
                <a href="">Edit</a>
            </div>
            <div class="button2">
                <a href="">Delete</a>
            </div>
        </div>
    </div>`
    }
    
    
}