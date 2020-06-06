const fetch = require('node-fetch')

fetch('https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg').then(res => res.blob()).then(res => {
    const data = new FormData()
    console.log(res)
    data.append('file', res, name='Delete_key1.jpg')
    fetch('http://localhost:5000/post', {
        method: 'POST',
        body: data,
        headers: {
            'Content-type': 'multipart/form'
        }
    })
})

