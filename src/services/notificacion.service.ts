import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificacionService {
    
    constructor(private readonly mailService: MailerService){}

    async enviarCorreoBienvenida(registro: any) {
        const contexto = {usuario: registro.usuario} as any;
        const envio = await this.enviarEmail(registro.correo, 'Creación de nuevo usuario', 'nuevo_usuario', contexto);
        return envio ? envio.response : null;
    }

    private async enviarEmail(correo: string, subject: string, template: string, context: any){
        return await this.mailService.sendMail({
            to:correo,
            from:"sinteticas@sinteticas.com",
            subject: subject,
            template,
            context
           });
    }

}