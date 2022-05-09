export interface FieldModel {
  id?: number,
  check?: boolean,
  tab: string,
  internalFieldReference: string,
  fieldNameInSheet: string,
  column: string,
  mandatoryForModel: boolean
}