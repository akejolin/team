export const monthNumber = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

export const HALF_DAYS = [
    { name: 'Trettondagsafton', date: '2018-01-05' },
    { name: 'Skärtorsdag', date: '2018-03-29' },
    { name: 'Valborg', date: '2018-04-30' },
    { name: 'Kristehim', date: '2018-05-09' },
    { name: 'Nationaldagen', date: '2018-06-05' },
    { name: 'Alla helgona helgen', date: '2018-11-02' },
  ]

export const WEEKDAY = ['S','M','T','O','T','F','S']

export const reddays = [
  { name: 'Julafton', date: '2016-12-24'},
  { name: 'Juldagen', date: '2016-12-25' },
  { name: 'Annandag jul', date: '2016-12-26' },
  { name: 'Nyårsdagen', date: '2017-01-01' },
  { name: 'Trettondagsafton', date: '2017-01-06' },
  { name: 'Långfredag', date: '2017-04-14' },
  { name: 'Påskafton', date: '2017-04-15' },
  { name: 'Påskdagen', date: '2017-04-16' },
  { name: 'Annandag påsk', date: '2017-04-17' },
  { name: 'Första maj', date: '2017-05-01' },
  { name: 'Kristehimmelsfärd dag', date: '2017-05-25' },
  { name: 'Nationaldagen', date: '2017-06-06' },
  { name: 'Julafton', date: '2017-12-24' },
  { name: 'Juldagen', date: '2017-12-25' },
  { name: 'Annandag jul', date: '2017-12-26' },
  { name: 'Alla helgon helg', date: '2017-11-04' },
  { name: 'Nyårsdagen', date: '2018-01-01' },
  { name: 'Trettondagen', date: '2018-01-06' },
  { name: 'Långfredagen', date: '2018-03-30' },
  { name: 'Påskafton', date: '2018-03-31' },
  { name: 'Påskdagen', date: '2018-04-01' },
  { name: 'Annadag påsk', date: '2018-04-02' },
  { name: 'Första maj', date: '2018-05-01' },
  { name: 'Kristi himmelsfärds dag', date: '2018-05-10' },
  { name: 'Nationaldagen', date: '2018-06-06' },
  { name: 'Midsomardagen', date: '2018-06-23' },
  { name: 'Alla helgons dag', date: '2018-11-03' },
  { name: 'Julafton', date: '2018-12-24' },
  { name: 'Juldagen', date: '2018-12-25' },
  { name: 'Annadag jul', date: '2018-12-26' },
]

export type IabsentTypes = 'SICK' |
'SICK_HALF' | 'VAB' | 'VAB_HALF' | 'WORK_HOME' | 'WORK_HOME_HALF' | 'WORK_OFFICE' | 'WORK_OFFICE_HALF' |
'HOLIDAY' | 'HOLIDAY_HALF' | 'LATE' | 'PARENTAL_LEAVE' | 'PARENTAL_LEAVE_HALF' | 'DAY_OFF' | 'LEAVE' | 'RED_DAY'

export type IabsentTypesArrayObject = { 
  key: IabsentTypes, label: String 
}
export const absentTypes:IabsentTypesArrayObject[] = [
  { key: "SICK", label: "Sjuk" },
  { key: "SICK_HALF", label: "Sjuk halvdag" },
  { key: "VAB", label: "Vabb" },
  { key: "VAB_HALF", label: "Vabb halvdag" },
  { key: "WORK_HOME", label: "Jobba hemma" },
  { key: "WORK_HOME_HALF", label: "Jobba hemma halvdag" },
  { key: "WORK_OFFICE", label: "Jobba kontoret" },
  { key: "WORK_OFFICE_HALF", label: "Jobba kontoret halvdag" },
  { key: "HOLIDAY", label: "Semester" },
  { key: "HOLIDAY_HALF", label: "Semester halvdag" },
  { key: "LATE", label: "Sen" },
  { key: "PARENTAL_LEAVE", label: "Föräldraledig" },
  { key: "PARENTAL_LEAVE_HALF", label: "Föräldraledig halvdag" },
  { key: "DAY_OFF", label: "Ledig/flex" },
  { key: "LEAVE", label: "Tjänstledig" },
  { key: "RED_DAY", label: "Röd dag" }
]