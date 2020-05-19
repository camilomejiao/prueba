export class User {

  constructor(
    public _id: string,
    public name: string,
    public lastname: string,
    public email: string,
    public tipoidentificacion: string,
    public numeroidentificacion: string,
    public password: string,
    public rol: 'USER'
  ) { }

}
