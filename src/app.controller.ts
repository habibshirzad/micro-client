import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';


const logger = new Logger("ClientAppController");

@Controller()
export class AppController {
  constructor(@Inject('LOGGER_SERVICE') private readonly client: ClientProxy) {}


  async onApplicationBootstrap(){
    await this.client.connect();
  }

  @Get()
  emitMessage() {
    logger.log("in microservice client");
    this.client.emit<any>('log_message',{text:  'service communicating'})  
    }
}
