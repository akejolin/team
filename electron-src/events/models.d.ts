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