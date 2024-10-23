import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

const DismissibleCard = ({ title, onClose, children, minHeight, avatar }) => {
  return (
    <Card sx={{ boxShadow: 4, borderRadius: 4, minHeight: minHeight, p: 1 }}>
      <CardHeader
        avatar={avatar}
        action={
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        }
        title={
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'light',
            }}
            data-test-id="card-title"
          >
            {title}
          </Typography>
        }
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

DismissibleCard.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  minHeight: PropTypes.number,
  avatar: PropTypes.node,
};

export default DismissibleCard;
