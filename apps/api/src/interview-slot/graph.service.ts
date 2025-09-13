import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  GRAPH_DEFAULT_PATH,
  GRAPH_USERS_PATH,
  SSO_LOGIN_PATH,
} from 'src/constants/index';

@Injectable()
export class GraphService {
  private tenantId = process.env.AZURE_TENANT_ID;

  async getAppAccessToken(): Promise<string> {
    try {
      const params = new URLSearchParams();
      params.append('client_id', process.env.AZURE_CLIENT_ID);
      params.append('client_secret', process.env.AZURE_CLIENT_SECRET);
      params.append('scope', GRAPH_DEFAULT_PATH);
      params.append('grant_type', 'client_credentials');

      const response = await axios.post(
        `${SSO_LOGIN_PATH}/${this.tenantId}/oauth2/v2.0/token`,
        params.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );

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
    try {
      const token = await this.getAppAccessToken();
      await axios.post(
        `${GRAPH_USERS_PATH}/${process.env.DUMP_ORGANIZER_EMAIL}/events`,
        {
          subject: eventData.subject,
          start: { dateTime: eventData.start, timeZone: 'UTC' },
          end: { dateTime: eventData.end, timeZone: 'UTC' },
          attendees: [
            ...eventData.attendees,
            {
              emailAddress: {
                address: process.env.DUMP_OFFICE_EMAIL,
                name: eventData.roomName,
              },
              type: 'resource',
            },
          ],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (err: any) {
      console.error(
        'Failed to create outlook event:',
        err.response?.data || err.message,
      );
      throw err;
    }
  }
}
