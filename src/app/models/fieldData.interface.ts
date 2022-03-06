export interface FieldModel {
  id?: number,
  tab: string,
  internalFieldReference: string,
  fieldNameInSheet: string,
  column: string,
  mandatoryForModel: boolean
}