import { useMutation } from 'react-query';

import { FormValues } from '../pages/ApplicationFormPage/ApplicationFormPage';
import { api } from '.';

const addIntern = async (newIntern: FormValues) => {
  const newInternToAdd = {
    firstName: newIntern.firstName,
    lastName: newIntern.lastName,
    email: newIntern.email,
    fields: newIntern.fields,
    data: {
      phoneNumber: newIntern.phoneNumber,
      dateOfBirth: newIntern.dateOfBirth,
      educationOrEmploymentStatus: newIntern.educationOrEmploymentStatus,
      highSchoolOrCollegeName: newIntern.highSchoolOrCollegeName,
      foundOutAboutInternshipBy: newIntern.foundOutAboutInternshipBy,
      reasonForApplying: newIntern.reasonForApplying,
    },
  };
  try {
    await api.post('/intern', newInternToAdd);
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
