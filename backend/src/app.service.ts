import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
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
      const tokens = await oauth2Client.getToken(code);
      const filePath = 'tokens.json';

      if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(tokens.tokens));
        console.log('Tokens overwritten in tokens.json');
      } else {
        fs.writeFileSync(filePath, JSON.stringify(tokens.tokens));
        console.log('Tokens saved to tokens.json');
      }
      process.exit(0);
    } catch (err) {
      console.error('Error getting tokens:', err);
      process.exit(1);
    }
  }
}
