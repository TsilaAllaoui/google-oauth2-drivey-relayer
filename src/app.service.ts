import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { google } from 'googleapis';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  // Generate access token from code of OAuth2 page and send it to Drivey
  async sendAccessTokenToDrivey(code: string) {
    // OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      this.configService.get<string>('CLIENT_ID'),
      this.configService.get<string>('CLIENT_SECRET'),
      this.configService.get<string>('REDIRECT_URI'),
    );

    try {
      const drivey_url = this.configService.get<string>('DRIVEY_ENDPOINT');
      const tokens = await oauth2Client.getToken(code);

      console.log(tokens);

      await axios.post(drivey_url, {
        access_token: tokens.tokens.access_token,
        refresh_token: tokens.tokens.refresh_token,
      });

      return "Access granted successfully. You may close this window if it's not closed automatically.";
    } catch (err) {
      console.error('Error getting tokens:', err);
      return 'Error getting tokens:' + err;
    }
  }
}
