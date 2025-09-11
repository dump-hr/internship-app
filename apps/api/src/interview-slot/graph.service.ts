import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GraphService {
  private tenantId = process.env.AZURE_TENANT_ID;

  async getAppAccessToken(): Promise<string> {
    try {
      const params = new URLSearchParams();
      params.append('client_id', process.env.AZURE_CLIENT_ID);
      params.append('client_secret', process.env.AZURE_CLIENT_SECRET);
      params.append('scope', 'https://graph.microsoft.com/.default');
      params.append('grant_type', 'client_credentials');

      console.log('Requesting token with params:', params.toString());

      const response = await axios.post(
        `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`,
        params.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );

      console.log('Token response:', response.data);

      return response.data.access_token;
    } catch (err: any) {
      console.error(
        'Failed to get app token:',
        err.response?.data || err.message,
      );
      throw err;
    }
  }

  async createEvent(eventData: any) {
    const token = await this.getAppAccessToken();

    await axios.post(
      `https://graph.microsoft.com/v1.0/users/${process.env.DUMP_OFFICE_EMAIL}/events`,
      {
        subject: eventData.subject,
        start: { dateTime: eventData.start, timeZone: eventData.timeZone },
        end: { dateTime: eventData.end, timeZone: eventData.timeZone },
        attendees: eventData.attendees,
        location: { displayName: eventData.roomName },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  }
}
