import {
  EducationOrEmploymentStatus,
  Field,
  FoundOutAboutInternshipBy,
} from '@internship-app/types';
import { useMutation } from 'react-query';

import { api } from '.';

type InternToCreate = {
  firstName: string;
  lastName: string;
  email: string;
  fields: Field[];
  data: {
    phoneNumber: number;
    dateOfBirth: string;
    educationOrEmploymentStatus: EducationOrEmploymentStatus;
    highSchoolOrCollegeName: string;
    foundOutAboutInternshipBy: FoundOutAboutInternshipBy;
    reasonForApplying: string;
  };
};

const addIntern = async (newIntern: InternToCreate) => {
  try {
    await api.post('/intern', newIntern);
  } catch (err) {
    alert(err);
  }
};

export const usePostIntern = () => {
  return useMutation({
    mutationFn: addIntern,
    mutationKey: ['timesSubmitted'],
  });
};
