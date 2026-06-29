import React, { useContext } from "react";
import { makeStyles } from '@mui/styles';

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { nanoid } from 'nanoid';
import {
  TextField,
  Checkbox,
  Radio,
  Button,
  DialogContent,
  DialogActions,
} from "../common";


const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: 'calc(50% - 10px)',
      height: '100%',
      marginBottom: 10,
      marginTop: 10
    },
    '& > *:nth-child(even)': {
      marginLeft: 20
    }
  },
});

const MultipleOptions = ({ options = [], updateOptions }) => {
  const { t } = useContext(GlobalContext);

  const handleAddOption = () => {
    updateOptions([...options, {
      id: nanoid(), label: '', is_answer: false
    }])
  }

  const handleChangeOptionIsAnswer = (checked, option) => {
    let _options = options.map(o => ({
      ...o,
      is_answer: o.id === option.id ? checked : o.is_answer
    }))
    updateOptions(_options)
  }

  const handleChangeOptionLabel = (label, option) => {
    let _options = options.map(o => ({
      ...o,
      label: o.id === option.id ? label : o.label
    }))
    updateOptions(_options)
  }

  const handleDeleteOption = (option) => {
    let _options = options.filter(o => o.id !== option.id)
    updateOptions(_options)
  }

  return (<>
    <Button onClick={handleAddOption}><AddIcon /></Button>
    {
      options.map((option, index) => <div style={{ display: 'flex', marginBottom: 8 }} key={option.id}>
        <Button onClick={() => handleDeleteOption(option)}><DeleteIcon /></Button>
        <TextField
          label={`option${index + 1}`}
          type="text"
          value={option.label}
          fullWidth
          onChange={e => handleChangeOptionLabel(e.target.value, option)}
        />
        <FormControlLabel
          sx={{ ml: 2 }}
          style={{ flexShrink: 0 }}
          value="end"
          control={<Checkbox color="primary" checked={option.is_answer}
            onChange={e => handleChangeOptionIsAnswer(e.target.checked, option)}
          />}
          label={t("is-answer")}
          labelPlacement="end"
        />
      </div>)
    }
  </>)
}

const SingleOptions = ({ options = [], updateOptions, answer = "", updateAnswer }) => {
  const { t } = useContext(GlobalContext);

  const handleAddOption = () => {
    updateOptions([...options, {
      id: nanoid(), label: '', is_answer: false
    }])
  }

  const handleChangeAnswer = (e) => {
    updateAnswer(e.target.value)
  }

  const handleChangeOptionLabel = (label, option) => {
    let _options = options.map(o => ({
      ...o,
      label: o.id === option.id ? label : o.label
    }))
    updateOptions(_options)
  }

  const handleDeleteOption = (option) => {
    let _options = options.filter(o => o.id !== option.id)
    updateOptions(_options)
  }

  return (<>
    <Button onClick={handleAddOption}><AddIcon /></Button>
    {
      options.map((option, index) => <div style={{ display: 'flex', marginBottom: 8 }} key={option.id}>
        <Button onClick={() => handleDeleteOption(option)}><DeleteIcon /></Button>
        <TextField
          label={`option${index + 1}`}
          type="text"
          value={option.label}
          fullWidth
          onChange={e => handleChangeOptionLabel(e.target.value, option)}
        />
        <Radio
          checked={answer === option.id}
          onChange={handleChangeAnswer}
          value={option.id}
        />
      </div>)
    }
  </>)
}

export default ({
  onConfirm = () => { },
  item = {
    name: '',
    dataType: 'single',
    operator: '',
    options: [],
    answer: ''
  }
}) => {
  const { closeDialog, t, classes } = useContext(GlobalContext);
  const [state, setState] = React.useState(item);

  const updateOptions = (options) => {
    setState({ ...state, options })
  };

  const updateAnswer = (answer) => {
    setState({ ...state, answer })

  }
  return (
    <>
      <DialogContent
        dividers
        style={{
        }}>
        <TextField
          sx={{ mb: 2 }}
          label={t("name")}
          type="text"
          fullWidth
          value={state.name}
          onChange={e => setState({ ...state, name: e.target.value })}
        />
        <TextField
          sx={{ mb: 2 }}
          size="small"
          select
          fullWidth
          required
          value={state.dataType}
          label={t("data-type")}
          onChange={e => setState({
            ...state,
            dataType: e.target.value
          })}
        >
          <MenuItem value="single">single</MenuItem>
          <MenuItem value="multiple">multiple</MenuItem>
          <MenuItem value="numeric">numeric</MenuItem>
        </TextField>
        {
          state.dataType === 'numeric' && <>
            <TextField
              sx={{ mb: 2 }}
              size="small"
              fullWidth
              select
              required
              value={state.operator}
              label={t("_operator")}
              onChange={e => setState({
                ...state,
                operator: e.target.value
              })}
            >
              <MenuItem value=">">{'>'}</MenuItem>
              <MenuItem value="<">{'<'}</MenuItem>
              <MenuItem value="=">=</MenuItem>
            </TextField>
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              label={t("numerical")}
              type="number"
              value={state.numerical}
              onChange={e => setState({ ...state, numerical: e.target.value })}
            />
          </>
        }
        {
          state.dataType === 'multiple' && <MultipleOptions options={state.options} updateOptions={updateOptions} />
        }
        {
          state.dataType === 'single' && <SingleOptions
            answer={state.answer}
            options={state.options}
            updateAnswer={updateAnswer}
            updateOptions={updateOptions} />
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          {t("cancel")}
        </Button>
        <Button color="primary" variant="contained" onClick={() => onConfirm(state)}>
          {t("confirm")}
        </Button>
      </DialogActions>
    </>
  )
}