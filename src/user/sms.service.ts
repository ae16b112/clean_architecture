import { Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class smsService {
  public constructor(@InjectTwilio() private readonly client: TwilioClient) {}

  async sendSMS(phoneNumber: string) {

    if ( !this.validE164(phoneNumber) ) 
      {
          throw new Error('number must be E164 format!')
      }
    
      else
      { 

        try 
        {
          return await this.client.messages.create({
          body: 'SMS Body, sent to the phone!',
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phoneNumber,
          });        
        } catch (e) {
          return e;
        }

      }  
    }

    
  validE164(num: string) 
  {
    return /^\+?[1-9]\d{1,14}$/.test(num)
  }

}


