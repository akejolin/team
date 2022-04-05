export const monthNumber = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']

export const HALF_DAYS = [
    { name: 'Trettondagsafton', date: '2018-01-05' },
    { name: 'Skärtorsdag', date: '2018-03-29' },
    { name: 'Valborg', date: '2018-04-30' },
    { name: 'Kristehim', date: '2018-05-09' },
    { name: 'Nationaldagen', date: '2018-06-05' },
    { name: 'Alla helgona helgen', date: '2018-11-02' },
    { name: 'Skärtorsdag', date: '2022-04-14' },
    { name: 'Kristehim', date: '2022-05-25' },
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
  { name: 'Långfredagen', date: '2022-04-15' },
  { name: 'Påskafton', date: '2022-04-16' },
  { name: 'Påskdagen', date: '2022-04-17' },
  { name: 'Annadag påsk', date: '2022-04-18' },

  { name: 'Första maj', date: '2022-05-01' },
  { name: 'Kristi himmelsfärdsdag', date: '2022-05-26' },
  { name: 'Sveriges nationaldag', date: '2022-06-06' },
  { name: 'Midsommarafton', date: '2022-06-24' },
]

export type IabsentTypes = 'SICK' |
'SICK_HALF' | 'VAB' | 'VAB_HALF' | 'VOB' | 'VOB_HALF' | 'WORK_HOME' | 'WORK_HOME_HALF' | 'WORK_OFFICE' | 'WORK_OFFICE_HALF' |
'HOLIDAY' | 'HOLIDAY_HALF' | 'LATE' | 'PARENTAL_LEAVE' | 'PARENTAL_LEAVE_HALF' | 'DAY_OFF' | 'LEAVE' | 'RED_DAY' | 'EXTERNAL_WORK'

export type IabsentTypesArrayObject = { 
  key: IabsentTypes, label: String, isPrimary: Boolean 
}
export const absentTypes:IabsentTypesArrayObject[] = [
  { key: "SICK", label: "Sick", isPrimary: true  },
  { key: "SICK_HALF", label: "Sick half day" , isPrimary: false},
  { key: "VAB", label: "Vab", isPrimary: true},
  { key: "VAB_HALF", label: "Vab half day" , isPrimary: false},
  { key: "VOB", label: "Work and Vab", isPrimary: true},
  { key: "VOB_HALF", label: "Work and Vab half day" , isPrimary: false},
  { key: "WORK_OFFICE", label: "At Office" , isPrimary: true},
  { key: "WORK_OFFICE_HALF", label: "At Office half day", isPrimary: false },
  { key: "HOLIDAY", label: "Holiday" , isPrimary: true},
  { key: "HOLIDAY_HALF", label: "Holiday half day", isPrimary: false },
  { key: "PARENTAL_LEAVE", label: "Parental leave" , isPrimary: true},
  { key: "PARENTAL_LEAVE_HALF", label: "Parental leave half day", isPrimary: false },
  { key: "LEAVE", label: "On leave/flex" , isPrimary: true},
  { key: "EXTERNAL_WORK", label: "External work" , isPrimary: true},
  { key: "RED_DAY", label: "Red day" , isPrimary: true}
]