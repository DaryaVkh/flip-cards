import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CardService } from './card/card.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [CardService],
})
export class AppModule {}
