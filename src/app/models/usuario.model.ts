export class Usuario {
    nome: string = '';
    localizacao?: string = ''; 
    usuario: string = '';
    senha: string = '';
  }

  export interface UsuarioLogin {
    usuario: string;
    senha: string;
  }
  