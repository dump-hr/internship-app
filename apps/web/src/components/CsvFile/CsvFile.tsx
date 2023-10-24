import { Intern, InternForDashboard } from '@internship-app/types';
import { Button } from '@mui/material';
import { CSVLink } from 'react-csv';

type Props = {
  data: InternForDashboard[] | undefined;
};

const CsvFile = ({ data }: Props) => {
  const headers = [
    { label: 'Id', key: 'id' },
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

    { label: 'Staus interviewa', key: 'interviewStatus' },

    { label: 'Score', key: 'interviewSlot.score' },
  ];

  const formattedData = data?.map((item: Intern) => ({
    ...item,
    internDisciplines: item.internDisciplines
      .map((el) => el.discipline)
      .join(', '),
    data: {
      ...item.data,
      dateOfBirth:
        typeof item.data.dateOfBirth === 'string'
          ? new Date(item.data.dateOfBirth).getUTCFullYear()
          : item.data.dateOfBirth,
    },
  }));

  return (
    <Button>
      <CSVLink
        style={{
          font: 'inherit',
          textDecoration: 'inherit',
          color: 'inherit',
        }}
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
