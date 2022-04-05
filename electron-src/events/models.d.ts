export interface BaseModel<extension> {
  id: Number,
  [...extension]
}

export interface NoteModel {
  year?: Number,
  date?: string,
  emp?: string,
  impact?: number,
  tags?: string[],
  comment?: string,
}
export interface AbsentModel {
  name: string,
  date: string,
  type: string,
}
