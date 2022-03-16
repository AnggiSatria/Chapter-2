const emailReceiver = 'anggisatria122@gmail.com'

function submitForm() {
    let name = document.getElementById('nama').value
    let email = document.getElementById('Email').value
    let phone = document.getElementById('Phone').value
    let subject = document.getElementById('Subject').value
    let Message = document.getElementById('Message').value

    if(nama == ""){
        alert('name cannot be empty')
    }
    if(email == ""){
        alert('email cannot be empty')
    }
    if(phone == ""){
        alert('phone cannot be empty')
    }
    if(Message == ""){
        alert('message cannot be empty')
    }
    
    console.log(name)
    console.log(email)
    console.log(phone)
    console.log(subject)
    console.log(Message)

    let a = document.createElement('a')
    a.href = `mailto:${emailReceiver}?subject=${subject}&body=Hello my name ${name}, here my phone number ${phone}, ${Message}`
    a.click()
}
