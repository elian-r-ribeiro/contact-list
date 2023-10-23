export class Contato{
    private _id!: string;
    private _nome: string;
    private _email: string;
    private _telefone: number;
    private _genero: number;
    private _downloadURL : any;

    constructor(nome: string, email : string, telefone : number, genero : number){
        this._nome = nome;
        this._email = email;
        this._telefone = telefone;
        this._genero = genero;
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get nome(): string{
        return this._nome;
    }
    public set nome(nome: string){
        this._nome = nome;
    }

    public get telefone(): number{
        return this._telefone;
    }
    public set telefone(telefone: number){
        this._telefone = telefone;
    }

    public get email(): string{
        return this._email;
    }
    public set email(email: string){
        this._email = email;
    }

    public get genero(): number {
        return this._genero;
    }
    public set genero(value: number) {
        this._genero = value;
    }
    
    public get downloadURL() : any{
        return this._downloadURL;
    }

    public set downloadURL(value : any){
        this._downloadURL = value;
    }
}