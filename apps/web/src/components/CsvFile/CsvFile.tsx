import { Button } from '@mui/material';
import { CSVLink } from 'react-csv';

import { useFetchAllInterns } from '../../api/useFetchAllInterns';

const CsvFile = () => {
  const { data: interns } = useFetchAllInterns();

  const headers = [
    { label: 'Id', key: 'id' }, //do we need this?
    { label: 'Ime', key: 'firstName' },
    { label: 'Prezime', key: 'lastName' },
    { label: 'Email', key: 'email' },

    { label: 'Godište', key: 'data.dateOfBirth' },
    { label: 'Kontakt', key: 'data.phoneNumber' },
    { label: 'Status', key: 'data.educationOrEmploymentStatus' },
    { label: 'Škola', key: 'data.highSchoolOrCollegeName' },
    { label: 'Godina/Razred', key: 'data.yearOfStudy' },
    { label: 'Razlog prijave', key: 'data.reasonForApplying' },
    { label: 'Kako ste čuli za nas?', key: 'data.foundOutAboutInternshipBy' },

    { label: 'Područja', key: 'internDisciplines' },

    { label: 'Staus interviewa', key: 'interviewStatus' }, //do we need this?

    { label: 'Score', key: 'interviewSlot.score' }, //do we need answers (or even this)?
  ];

  const formattedData = interns?.map((item) => ({
    ...item,
    internDisciplines: item.internDisciplines
      .map((el) => el.discipline)
      .join(', '),
  }));

  return (
    <Button
      style={{ marginBottom: '10px' }}
      variant="contained"
      color="secondary"
    >
      <CSVLink
        style={{ textDecoration: 'none', color: 'white' }}
        data={formattedData ? formattedData : []}
        headers={headers}
        filename={'interns.csv'}
        target="_blank"
      >
        Download csv
      </CSVLink>
    </Button>
  );
};
export default CsvFile;
