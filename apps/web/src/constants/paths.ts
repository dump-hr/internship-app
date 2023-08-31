export enum Path {
  Home = '/',
  Login = '/login',
  Logout = '/logout',
  Interview = '/interview/:internId',
  CatchAll = '/:path*',
}
