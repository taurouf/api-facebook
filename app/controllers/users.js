const UserModel = require('../models/user.js')

const User = class User {
  /**
   * @constructor
   * @param {Object} app
   * @param {Object} config
   */
  constructor (app, connect, config) {
    this.app = app
    this.UserModel = connect.model('User', UserModel)

    this.run()
  }

  /**
    * show
    */
  show() {
    this.app.get('/user/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Bade Request : Please use a id in the query string parameter'
          })

          return;
        }

        this.UserModel.findById(req.params.id).then((user) => {
          res.status(200).json(user || {})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] get:users/:id -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        })
      }
    })
  }

  /**
    * delete
    */
  delete() {
    this.app.delete('/user/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Bade Request : Please use a id in the query string parameter'
          })

          return;
        }

        this.UserModel.findOneAndDelete(req.params.id).then((user) => {
          res.status(200).json(user || {})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] delete:users/:id -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        })
      }
    })
  }

  /**
    * update
    */
  update() {
    this.app.patch('/user/:id', (req, res) => {
      try {
        if (!req.params.id) {
          res.status(400).json({
            status: 400,
            message: 'Bade Request : Please use a id in the query string parameter'
          })

          return;
        }

        const options = { new: true, runValidators: true };

        this.UserModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          options
        ).then((userUpdated) => {
          res.status(200).json(userUpdated || {})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] delete:users/:id -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        })
      }
    })
  }

  /**
   * create
   */
  create () {
    this.app.post('/user/', (req, res) => {
      try {
        const userModel = new this.UserModel(req.body)

        userModel.save().then((user) => {
          res.status(200).json(user || {})
        }).catch((err) => {
          res.status(400).json({
            status: 400,
            message: err
          })
        })
      } catch (err) {
        console.error(`[ERROR] post:users/ -> ${err}`)

        res.status(500).json({
          status: 500,
          message: 'Internal Server Error'
        })
      }
    })
  }

  /**
   * Run crud
   */
  run () {
    this.show()
    this.delete()
    this.update()
    this.create() 
  }
}

module.exports = User
