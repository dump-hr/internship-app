export enum Path {
  Home = '/',
  ApplicationFormPage = '/application-form',
  Login = '/login',
  Logout = '/logout',
  Interview = '/interview/:internId',
  CatchAll = '/:path*',
}
