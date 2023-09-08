export enum Path {
  Home = '/',
  ApplicationForm = '/application-form',
  Login = '/login',
  Logout = '/logout',
  Interview = '/interview/:internId',
  InterviewDateTime = '/interview-date-time/:internId',
  CatchAll = '/:path*',
}
