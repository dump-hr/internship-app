export enum Path {
  Home = '/',
  ApplicationForm = '/application-form',
  Status = '/status/:internId',
  Login = '/login',
  Logout = '/logout',
  Interview = '/interview/:internId',
  ScheduleInterview = '/schedule-interview/:internId',
  CatchAll = '/:path*',
  Dashboard = '/dashboard',
}
