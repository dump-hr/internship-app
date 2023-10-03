export enum Path {
  Home = '/',
  ApplicationForm = '/application-form',
  ScheduleInterview = '/schedule-interview/:internId',
  ScheduleTest = '/schedule-test/:discipline/:internId',
  Status = '/status/:internId',

  Dashboard = '/admin',
  Login = '/admin/login',
  Intern = '/admin/intern/:internId',
  Interview = '/admin/interview/:internId',
  Interviewers = '/admin/interviewers',
  InterviewPicker = '/admin/interview-scheduler',
  TestScheduler = '/admin/test-scheduler',
  TestOverview = '/admin/test-overview/:testSlotId',
  Counter = '/admin/counter',

  CatchAll = '/:path*',
}
