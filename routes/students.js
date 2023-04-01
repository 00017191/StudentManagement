const express = require('express')
const uuid = require('uuid')
// const axios = require('axios')
const router = express.Router()
const {readDataFromJson, writeDataIntoJson} = require('./middlewares')


//Not worked for some reason when hosted on glitch.com
// async function searchHN(query) {
//     const response = await axios.get(
//       `https://hn.algolia.com/api/v1/search?query=${query}&tags=story&hitsPerPage=90`
//     );
//
//     return response.data;
//   }


//get all students 
router.get('/', (req, res) => {
    const data = readDataFromJson()
    res.render('home', {
        students: data
    })
})

router.get('/detail/:id', (req, res) => {
    const searchQuery = req.params.id;
    if (!searchQuery) {
      res.redirect(302, '/');
      return;
    }
    let data = readDataFromJson()
    const found = data.find(student => student.id === searchQuery) 
    if (found) {
        res.render('detail', {
            title: `Search result for ${searchQuery}`,
            student: found,
            searchQuery
        })
    }
    else {
        res.render('error')
    }
  
})


//router for getting student by search query
router.get('/search', async (req, res) => {
    const searchQuery = req.query.q;
    if (!searchQuery) {
      res.redirect(302, '/');
      return;
    }
    let data = readDataFromJson()
    const found = data.find(student => student.id === searchQuery) 
    if (found) {
        res.render('search', {
            title: `Search result for ${searchQuery}`,
            student: found,
            searchQuery
        })
    }
    else {
        res.render('error')
    }
  
  });

router.get('/add-new', (req, res) => {
    res.render('form')
})

//create a new student
router.post('/new', (req, res) => {
    console.log(req.body)
    let data = readDataFromJson()
    const newStudent = {
        id: uuid.v4(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        joined_at: (new Date()).toISOString().split('T')[0],
        class_num: req.body.class_num,
        scholarship: req.body.scholarship,
        status: req.body.status
    }

    if (!newStudent.first_name || !newStudent.email) {
        return res.render('error')
    }

    data.push(newStudent)
    writeDataIntoJson(data)
    res.redirect('/')
})


router.get('/update-stud/:id', (req, res) => {
    const searchQuery = req.params.id;
    if (!searchQuery) {
      res.redirect(302, '/');
      return;
    }
    let data = readDataFromJson()
    const found = data.find(student => student.id === searchQuery) 
    if (found) {
        res.render('edit-form', {
            student: found,
        })
    }
    else {
        res.render('error')
    }
})

router.put('/update/:id', (req, res) => {
    let data = readDataFromJson()
    const found = data.some(student => student.id == req.params.id) 

    if (found) {
        const updateStudent = req.body
        data.forEach(student => {
            if (student.id == req.params.id) {
                student.first_name = updateStudent.first_name ? updateStudent.first_name: student.first_name
                student.last_name = updateStudent.last_name ? updateStudent.last_name: student.last_name
                student.email = updateStudent.email ? updateStudent.email: student.email
                student.status = updateStudent.status ? updateStudent.status : student.status
                writeDataIntoJson(data)
                res.redirect('/')
            }
        });
    }
    else {
        res.render('error')
    }
})


router.delete('/delete/:id', (req, res) => {
    let data = readDataFromJson()
    const found = data.some(student => student.id == req.params.id) 

    if (found) {
        data = data.filter(student => student.id != req.params.id)
        res.redirect('/')
        writeDataIntoJson(data)
    }
    else {
        res.sendStatus(400)
    }
})






module.exports = router