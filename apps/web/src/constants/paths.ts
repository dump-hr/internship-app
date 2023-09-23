export enum Path {
  Home = '/',
  ApplicationForm = '/application-form',
  Status = '/status/:internId',
  Login = '/login',
  Logout = '/logout',
  Interview = '/interview/:internId',
  CatchAll = '/:path*',
  Intern = '/intern/:internId',
  Dashboard = '/dashboard',
}
