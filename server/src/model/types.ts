export type ID = number;

export interface Entity {
  id: ID;
  createdOn: Date;
  updatedOn: Date;
}

export type Values<E extends Entity> = Omit<E, keyof Entity>;
