export enum Path {
  Home = '/',
  ApplicationForm = '/application-form',
  ScheduleInterview = '/schedule-interview/:internId',
  ScheduleTest = '/schedule-test/:discipline/:internId',
  Status = '/status/:internId',

  Dashboard = '/admin',
  Login = '/admin/login',
  Interview = '/admin/interview/:internId',
  Interviewers = '/admin/interviewers',
  Intern = '/admin/intern/:internId',
  TestScheduler = '/admin/test-scheduler',
  TestOverview = '/admin/test-overview/:testSlotId',

  CatchAll = '/:path*',
}
