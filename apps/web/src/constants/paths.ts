export enum Path {
  Home = '/',
  ApplicationForm = '/application-form',
  ScheduleInterview = '/schedule-interview/:internId',
  Status = '/status/:internId',

  Dashboard = '/admin',
  Login = '/admin/login',
  Interview = '/admin/interview/:internId',
  Intern = '/admin/intern/:internId',

  CatchAll = '/:path*',
  
  AdminInterviewPicker = '/admin/interview',
}
