import { TestSlotPreviewDto } from '@internship-app/types';

export enum SlotCardType {
  Existing = 'Existing',
  AboutToAdd = 'AboutToAdd',
}

export type TestSlotCard = TestSlotPreviewDto & {
  type: SlotCardType;
};
