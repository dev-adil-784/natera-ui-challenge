import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useForm, FormProvider } from 'react-hook-form';
import { FieldFormCard, NotesFormCard } from '../../components';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { createPost } from '../../api';

const FIRST_FORM_FIELDS = [
  {
    type: 'text',
    name: 'field1',
    placeholder: 'Field number 1 - one line',
  },
  {
    type: 'text',
    name: 'field2',
    placeholder: 'Field number 2 - one line',
  },
];

const SECOND_FORM_FIELDS = [
  {
    type: 'checkbox',
    name: 'checkbox1',
    title: 'Question 1',
    subTitle: 'Description 1',
    label: 'Checkbox 1',
  },
  {
    type: 'checkbox',
    name: 'checkbox2',
    title: 'Question 2',
    subTitle: 'Description 2',
    label: 'Checkbox 2',
  },
  {
    type: 'text',
    name: 'field1',
    placeholder: 'Field number 1 - one line',
  },
];

const FieldFromPage = () => {
  const [checked, setChecked] = useState(false);

  const methods = useForm({
    defaultValues: {
      notes: '',
    },
  });

  const onSubmit = async (data) => {
    methods.reset();
    const postBody = Object.keys(data).map((key, index) => {
      const value = data[key];
      return {
        id: index + 1,
        title: key,
        body: value,
        userId: 1,
      };
    });

    const response = await createPost(postBody);

    alert(JSON.stringify(response, null, 2));
  };

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            width: '250px',
            fontSize: '1.25rem',
          },
        },
      },
    },
  });

  const formLabel = checked ? 'Form 2' : 'Form 1';
  const formFields = checked ? SECOND_FORM_FIELDS : FIRST_FORM_FIELDS;

  const handleChange = () => {
    setChecked((prevChecked) => !prevChecked);
    methods.reset();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 10 }} maxWidth="lg">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                name="switcher-main"
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Form B"
          />
        </FormGroup>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={6}>
              <Grid size={8}>
                <FieldFormCard label={formLabel} fields={formFields} />
              </Grid>
              <Grid size={4}>
                <NotesFormCard
                  label="Notes"
                  name="notes"
                  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularized in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center" spacing={2} sx={{ mt: 10 }}>
              <Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Container>
    </ThemeProvider>
  );
};

export default FieldFromPage;
