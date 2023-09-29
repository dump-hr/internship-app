export enum Path {
  Home = '/',
  ApplicationForm = '/application-form',
  ScheduleInterview = '/schedule-interview/:internId',
  ScheduleTest = '/schedule-test/:discipline/:internId',
  Status = '/status/:internId',

  Dashboard = '/admin',
  Login = '/admin/login',
  Interview = '/admin/interview/:internId',
  Intern = '/admin/intern/:internId',

  CatchAll = '/:path*',
}
