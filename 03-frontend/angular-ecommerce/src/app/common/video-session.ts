export class VideoSession {
  id?: number;
  sessionDateTime: string;
  password: string;
  inviteeEmail1: string;

  constructor(sessionDateTime: string, password: string, inviteeEmail1: string) {
    this.sessionDateTime = sessionDateTime;
    this.password = password;
    this.inviteeEmail1 = inviteeEmail1;
  }
}
