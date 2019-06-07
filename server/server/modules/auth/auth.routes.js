import express from 'express'
import passport from 'passport'
import { asyncWrapper } from '../../utils/asyncWrapper'
import { validate } from '../../utils/validate'
import { auth } from './auth.controller'
import { login } from './auth.validations'
require('../../utils/passport.js')

const authRoutes = express.Router()

authRoutes.post('/login', validate(login), asyncWrapper(auth.login))
authRoutes.get('/profile', asyncWrapper(auth.profile))

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

/**
 * authentication with google
 */
router.route('/google')
  .post(passport.authenticate('googleToken', { session: false }), authController.googleOAuth);

/**
 * authentication with facebook
 */
router.route('/facebook')
  .post(passport.authenticate('facebookToken', { session: false }), authController.facebookOAuth);

router.route('/secret')
  .get(passportJWT, authController.secret);

export { authRoutes }
