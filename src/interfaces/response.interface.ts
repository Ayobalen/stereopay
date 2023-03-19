export interface IResponse {
  status: 'success' | 'fail';
  message: string;
  data?: any;
  error?: any;
  meta?: any;
}
