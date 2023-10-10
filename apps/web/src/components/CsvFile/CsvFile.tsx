import { Intern, InternWithStatus } from '@internship-app/types';
import { Button } from '@mui/material';
import { CSVLink } from 'react-csv';

type Props = {
  data: InternWithStatus[] | undefined;
};

const CsvFile = ({ data }: Props) => {
  console.log(data);
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

  const formattedData = data?.map((item: Intern) => ({
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
