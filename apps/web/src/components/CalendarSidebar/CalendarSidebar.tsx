import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { useFetchInterviewers } from '../../api/useFetchInterviewers';
import { MultilineInput } from '../common/MultilineInput/MultilineInput';
import { CustomSelectInput } from '../common/SelectInput/CustomSelectInput';
import styles from './index.module.css';

interface Props {
  setInterviewers: (value: string[] | null) => void;
  setSelectedInterviewerFilter: (value: string[] | null) => void;
  setAdditionalNotesValue: (value: string | undefined) => void;
}

export const CalendarSidebar: React.FC<Props> = ({
  setInterviewers,
  setSelectedInterviewerFilter,
  setAdditionalNotesValue,
}: Props) => {
  const { data: interviewers } = useFetchInterviewers();

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterSection}>
        <FilterAltIcon className={styles.filterIcon} />
        <CustomSelectInput
          label="Intervjueri"
          menuOptions={interviewers?.map((interviewer) => ({
            key: interviewer.id,
            value: interviewer.name,
          }))}
          isMultiSelect={true}
          valueHandler={(value) => {
            setSelectedInterviewerFilter(
              typeof value === 'string' ? [value] : value,
            );
          }}
        />
      </div>
      <CustomSelectInput
        label="Intervjueri"
        menuOptions={interviewers?.map((interviewer) => ({
          key: interviewer.id,
          value: interviewer.name,
        }))}
        isMultiSelect={true}
        valueHandler={(value) => {
          const selectedInterviewers =
            typeof value === 'string' ? [value] : value;
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
