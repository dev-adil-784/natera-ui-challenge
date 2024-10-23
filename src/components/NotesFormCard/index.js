import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import DismissibleCard from '../DismissibleCard';
import { useFormContext } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import { blue, lightBlue } from '@mui/material/colors';

const NotesFormCard = ({
  label = 'Dummy',
  onClose = () => {},
  name = 'notes',
  placeholder = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
}) => {
  const { register } = useFormContext();

  const cardAvatar = (
    <Avatar sx={{ backgroundColor: lightBlue[50] }} aria-label="icon">
      <FilterNoneOutlinedIcon
        sx={{ color: blue[500], width: 18, height: 18 }}
      />
    </Avatar>
  );

  return (
    <DismissibleCard
      minHeight={330}
      title={label}
      onClose={onClose}
      avatar={cardAvatar}
    >
      <TextField
        {...register(name)}
        variant="outlined"
        multiline
        rows={8}
        placeholder={placeholder}
        fullWidth
      />
    </DismissibleCard>
  );
};

NotesFormCard.propTypes = {
  label: PropTypes.string,
  onClose: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export default NotesFormCard;
