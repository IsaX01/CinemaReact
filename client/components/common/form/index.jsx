import TextField from './TextField';
import DropDown from './DropDown';
import CheckBox from './CheckBox';
import PhoneField from './PhoneField';
import { ImageDropZone } from './ImageDropZone';
import { Calendar } from './Calendar';
import { Button } from './Button';

export const TextAreaField = ({ ...props }) => <TextField type="textarea" {...props} />;
export const NumberField = ({ ...props }) => <TextField type="number" {...props} />;
export const EmailField = ({ ...props }) => <TextField type="email" {...props} />;
export const PasswordField = ({ ...props }) => <TextField type="password" {...props} />;
export const LinkField = ({ ...props }) => <TextField type="url" {...props} />;

export { DropDown, CheckBox, TextField, ImageDropZone, Calendar, Button, PhoneField };
