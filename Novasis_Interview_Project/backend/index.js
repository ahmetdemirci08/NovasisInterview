const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const jwt = require('jsonwebtoken');
const app = express();

const PORT = 4000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));

const UserModel = require("./models/User");
const ConsultantModel = require("./models/Consultant");
const AppointmentModel = require("./models/Appointment");
db();

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  console.log('/register', req.body);
  bcrypt.hash(password, 10).then(hash => {
    UserModel.create({ name, email, password: hash })
      .then(user => {
        console.log('User created', user);
        res.json("Success");
      })
      .catch(err => {
        console.error('/register error', err);
        res.status(500).json(err);
      });
  }).catch(err => {
    console.error('bcrypt hash error', err);
    res.status(500).json(err);
  });
});

app.post('/ConsultantRegister', (req, res) => {
  const { name, email, password } = req.body;
  console.log('/ConsultantRegister', req.body);
  bcrypt.hash(password, 10).then(hash => {
    ConsultantModel.create({ name, email, password: hash })
      .then(user => {
        console.log('Consultant created', user);
        res.json("Success");
      })
      .catch(err => {
        console.error('/ConsultantRegister error', err);
        res.status(500).json(err);
      });
  }).catch(err => {
    console.error('bcrypt hash error', err);
    res.status(500).json(err);
  });
});

app.post('/Login', (req, res) => {
  const { email, password } = req.body;
  console.log('/Login', req.body);
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({ email: user.email, role: user.role }, "jwt-secret-key", { expiresIn: "1d" });
            res.cookie('token', token, { httpOnly: true, secure: false });
            return res.json({ Status: "Success", role: user.role });
          } else {
            console.error('/Login password incorrect');
            return res.status(401).json("The password is incorrect");
          }
        });
      } else {
        console.error('/Login user not found');
        return res.status(404).json("User not found");
      }
    }).catch(err => {
      console.error('/Login error', err);
      res.status(500).json(err);
    });
});

app.post('/ConsultantLogin', (req, res) => {
  const { email, password } = req.body;
  console.log('/ConsultantLogin', req.body);
  ConsultantModel.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({ email: user.email, role: user.role }, "jwt-secret-key", { expiresIn: "1d" });
            res.cookie('token', token, { httpOnly: true, secure: false });
            return res.json({ Status: "Success", role: user.role });
          } else {
            console.error('/ConsultantLogin password incorrect');
            return res.status(401).json("The password is incorrect");
          }
        });
      } else {
        console.error('/ConsultantLogin consultant not found');
        return res.status(404).json("Consultant not found");
      }
    }).catch(err => {
      console.error('/ConsultantLogin error', err);
      res.status(500).json(err);
    });
});

app.get('/consultants', (req, res) => {
  ConsultantModel.find().then(consultants => {
    console.log('/consultants response', consultants);
    res.json(consultants);
  }).catch(err => {
    console.error('/consultants error', err);
    res.status(500).json(err);
  });
});

 

app.post('/appointments', (req, res) => {
  const { consultantId } = req.body;
  const {userId} = req.body; // Replace this with the actual authenticated user ID

  console.log('/appointments', req.body);
  console.log('UserId', userId);

  ConsultantModel.findById(consultantId)
    .then(consultant => {
      if (!consultant) {
        console.error('/appointments consultant not found');
        return res.status(404).json({ message: 'Consultant not found' });
      }

      const newAppointment = new AppointmentModel({
        user: userId,
        consultant: consultantId,
        status: 'Pending'
      });

      newAppointment.save()
        .then(appointment => {
          console.log('Appointment created', appointment);
          res.json(appointment);
        })
        .catch(err => {
          console.error('/appointments save error', err);
          res.status(500).json(err);
        });
    })
    .catch(err => {
      console.error('/appointments ConsultantModel.findById error', err);
      res.status(500).json(err);
    });
});

app.get('/consultant/dashboard', (req, res) => {
  const consultantId = req.user.id; // assuming you have consultant authentication
  console.log('/consultant/dashboard', consultantId);

  AppointmentModel.find({ consultant: consultantId })
    .populate('user')
    .then(appointments => {
      console.log('/consultant/dashboard appointments found', appointments);
      res.json(appointments);
    })
    .catch(err => {
      console.error('/consultant/dashboard error', err);
      res.status(500).json(err);
    });
});

app.get('/admin/dashboard', (req, res) => {
  AppointmentModel.find()
    .populate('user') // Kullanıcı verilerini getirmek için populate kullanıyoruz
    .populate('consultant')
    .then(appointments => {
      console.log('/admin/dashboard randevular bulundu', appointments);
      res.json(appointments);
    })
    .catch(err => {
      console.error('/admin/dashboard hata', err);
      res.status(500).json(err);
    });
});

app.post('/appointments/:id/approve', (req, res) => {
  console.log('/appointments/:id/approve', req.params.id);

  AppointmentModel.findByIdAndUpdate(req.params.id, { status: 'Approved' })
    .then(appointment => {
      console.log(`Appointment ${appointment._id} approved`);
      res.json(appointment);
    })
    .catch(err => {
      console.error('/appointments/:id/approve error', err);
      res.status(500).json(err);
    });
});

app.post('/appointments/:id/reject', (req, res) => {
  console.log('/appointments/:id/reject', req.params.id);

  AppointmentModel.findByIdAndUpdate(req.params.id, { status: 'Rejected' })
    .then(appointment => {
      console.log(`Appointment ${appointment._id} rejected`);
      res.json(appointment);
    })
    .catch(err => {
      console.error('/appointments/:id/reject error', err);
      res.status(500).json(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
