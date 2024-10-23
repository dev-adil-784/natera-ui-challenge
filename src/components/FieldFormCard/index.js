import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DismissibleCard from '../DismissibleCard';
import { useFormContext } from 'react-hook-form';
import { grey } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

const getFormField = (field, index, register) => {
  if (field.type === 'text') {
    return (
      <TextField
        key={`Field ${index}`}
        sx={{ mt: 2 }}
        {...register(field.name)}
        variant="outlined"
        placeholder={field.placeholder}
        fullWidth
      />
    );
  } else if (field.type === 'checkbox') {
    return (
      <Box sx={{ mt: 2 }} key={`Checkbox ${index}`}>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              pl: 2,
              py: 1,
              bgcolor: grey[200],
              borderRadius: 1,
            }}
          >
            {field.title}
          </Typography>
        </Box>
        <Box sx={{ py: 1, pl: 2 }} display="flex" alignItems="center">
          <Checkbox {...register(field.name)} />
          <Box>
            <Typography
              sx={{
                color: grey[500],
                textTransform: 'uppercase',
                letterSpacing: '0.2rem',
                fontSize: '0.8rem',
              }}
              variant="body2"
            >
              {field.subTitle}
            </Typography>
            <Typography
              sx={{ fontSize: '1.2rem', fontWeight: 300 }}
              variant="body1"
            >
              {field.label}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
};

const FieldFormCard = ({ label = '', onClose = () => {}, fields = [] }) => {
  const { register } = useFormContext();

  return (
    <DismissibleCard minHeight={330} title={label} onClose={onClose}>
      {fields.map((field, index) => {
        return getFormField(field, index, register);
      })}
    </DismissibleCard>
  );
};

FieldFormCard.propTypes = {
  label: PropTypes.string,
  onClose: PropTypes.func,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      name: PropTypes.string,
      placeholder: PropTypes.string,
      title: PropTypes.string,
      subTitle: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  placeholder: PropTypes.string,
};

export default FieldFormCard;
