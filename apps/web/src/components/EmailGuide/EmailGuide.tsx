import { Box, List, ListItem, Typography } from '@mui/joy';

export const EmailGuide = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      bgcolor={'#D9D9D9'}
      borderRadius={'1rem'}
      marginTop={'1rem'}
      alignItems="center"
      justifyContent="space-around"
      padding={'1rem'}
    >
      <Typography
        fontSize={'1.5rem'}
        sx={{
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        Email Guide
      </Typography>
      <Typography
        fontSize={'1rem'}
        sx={{
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        This is a guide how to use this templating and email sending tool
      </Typography>
      <List
        sx={{
          width: '100%',
          maxWidth: '500px',
          marginBottom: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-around',
        }}
      >
        <ListItem sx={{ width: '100%', marginBottom: '0.5 rem' }}>
          <Typography
            fontSize={'1rem'}
            sx={{
              textAlign: 'flex-start',
            }}
          >
            1. Check if you have selected the correct emails in the email list
            below
          </Typography>
        </ListItem>
        <ListItem sx={{ width: '100%', marginBottom: '0.5 rem' }}>
          <Typography
            fontSize={'1rem'}
            sx={{
              textAlign: 'flex-start',
            }}
          >
            {
              '2. Write the email template in the textbox above. The way you write the template is by using different available intern variables in this format: {{intern.variable}}'
            }
          </Typography>
        </ListItem>

        <ListItem sx={{ width: '100%', marginBottom: '0.5 rem' }}>
          <Typography
            fontSize={'1rem'}
            sx={{
              textAlign: 'flex-start',
            }}
          >
            The available intern variables are: id, lastName, firstName, email,
            interviewStatus, internDisciplines[].discipline,
            internDisciplines[].priority, internDisciplines[].status,
            interviewSlot?.start, interviewSlot?.end, interviewSlot?.score
          </Typography>
        </ListItem>
        <ListItem sx={{ width: '100%', marginBottom: '0.5 rem' }}>
          <Typography
            fontSize={'1rem'}
            sx={{
              textAlign: 'flex-start',
            }}
          >
            3. Click the button "generate" to generate the emails, you can check
            the generated emails by pressing the preview button
          </Typography>
        </ListItem>
        <ListItem sx={{ width: '100%', marginBottom: '0.5 rem' }}>
          <Typography
            fontSize={'1rem'}
            sx={{
              textAlign: 'flex-start',
            }}
          >
            4. After you have checked that everything is fine, you can send the
            emails on the send button
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
};
