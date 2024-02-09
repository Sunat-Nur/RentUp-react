import { Member } from "./user";

export interface Event {
  _id: string;
  company_mb_id: string;
  event_location: string;
  event_title: string;
  event_description: string;
  event_status: string;
  event_image: string;
  event_date: string;
  member_data?: Member;
  createdAt: Date;
  updatedAt: Date;
}
