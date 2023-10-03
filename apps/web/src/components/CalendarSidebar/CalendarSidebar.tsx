import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { useFetchAllInterviewers } from '../../api/useFetchAllInterviewers';
import { MultilineInput } from '../common/MultilineInput/MultilineInput';
import { CustomSelectInput } from '../common/SelectInput/CustomSelectInput';
import styles from './index.module.css';

interface Props {
  setInterviewers: React.Dispatch<
    React.SetStateAction<string[] | null | undefined>
  >;
  setSelectedInterviewerFilter: React.Dispatch<
    React.SetStateAction<string[] | null | undefined>
  >;
  setAdditionalNotesValue: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export const CalendarSidebar: React.FC<Props> = ({
  setInterviewers,
  setSelectedInterviewerFilter,
  setAdditionalNotesValue,
}: Props) => {
  const { data: interviewers } = useFetchAllInterviewers();

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterSection}>
        <FilterAltIcon className={styles.filterIcon} />
        <CustomSelectInput
          label="Filtriraj"
          menuOptions={interviewers?.map((interviewer) => ({
            key: interviewer.id,
            value: interviewer.name,
          }))}
          isMultiSelect={true}
          valueHandler={(value) => {
            setSelectedInterviewerFilter(value);
          }}
        />
      </div>
      <CustomSelectInput
        label="Odaberi intervjuera"
        menuOptions={interviewers?.map((interviewer) => ({
          key: interviewer.id,
          value: interviewer.name,
        }))}
        isMultiSelect={true}
        valueHandler={(value) => {
          const selectedInterviewers = value;
          setInterviewers(selectedInterviewers);
        }}
      />
      <div>
        <div className={styles.notesLabel}>Notes:</div>
        <MultilineInput onValueChange={setAdditionalNotesValue} />
      </div>
    </div>
  );
};
