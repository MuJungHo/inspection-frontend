import React, { useContext, useCallback } from "react";
import { makeStyles } from '@mui/styles';

// import {
//   FormGroup,
//   RadioGroup
// } from '@mui/material';

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';

import {
  TextField,
  Checkbox,
  //  Radio, 
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

const AuthorizationSection = ({
  role = {
    roleName: "",
    rolesAuthorizationIds: [],
    isEnabled: true
  },
  onConfirm = () => { },
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState(role);
  const { closeDialog, t, authedApi } = useContext(GlobalContext);
  const { canAccessAction } = useContext(AuthContext);
  const [AuthorizationList, setAuthorizationList] = React.useState([]);

  React.useEffect(() => {
    getAuthorizations();
  }, [])

  const getAuthorizations = async () => {
    // 先取得預設的 20 筆資料
    const { data } = await authedApi.authorization.getAuthorizations();
    
    // 檢查是否有更多資料需要取得
    if (data.total > 20) {
      // 重新取得所有資料
      const { data: allData } = await authedApi.authorization.getAuthorizations({ amount: data.total });
      const _rows = allData.map(a => ({ ...a, _id: a.authorizationId }))
        .sort((a, b) => {
          // 先按照 name 排序
          if (a.name !== b.name) {
            return a.name.localeCompare(b.name);
          }
          // 如果 name 相同，再按照 scope 排序
          return a.scope.localeCompare(b.scope);
        });
      setAuthorizationList(_rows);
    } else {
      const _rows = data.map(a => ({ ...a, _id: a.authorizationId }))
        .sort((a, b) => {
          // 先按照 name 排序
          if (a.name !== b.name) {
            return a.name.localeCompare(b.name);
          }
          // 如果 name 相同，再按照 scope 排序
          return a.scope.localeCompare(b.scope);
        });
      setAuthorizationList(_rows);
    }
  }

  // 檢查使用者是否有權限選擇特定授權
  const canSelectAuthorization = (authorization) => {
    // 基於授權名稱和範圍檢查權限
    return canAccessAction(authorization.name, authorization.scope);
  }

  // 過濾掉無權限的授權ID
  const filterValidAuthorizationIds = (selectedIds) => {
    return selectedIds.filter(id => {
      const authorization = AuthorizationList.find(auth => auth._id === id);
      return authorization && canSelectAuthorization(authorization);
    });
  }

  return (
    <>
      <DialogContent
        dividers
        className={classes.content}
      >
        <TextField
          label={t("name")}
          type="text"
          value={state.roleName}
          onChange={e => setState({ ...state, roleName: e.target.value })}
        />
        <FormControl>
          <InputLabel>{t("authorization")}</InputLabel>
          <Select
            value={state.rolesAuthorizationIds}
            label={t("authorization")}
            multiple
            onChange={e => {
              const filteredIds = filterValidAuthorizationIds(e.target.value);
              setState({
                ...state,
                rolesAuthorizationIds: filteredIds
              });
            }}
          >
            {
              AuthorizationList
                .map(data => <MenuItem
                  key={data._id}
                  value={data._id}
                  disabled={!canSelectAuthorization(data)}>
                  {data.name} - {data.scope}
                </MenuItem>)
            }
          </Select>
        </FormControl>
        <div>
          <FormControlLabel
            value="end"
            control={<Checkbox
              checked={state.isEnabled}
              color="default"
              onChange={e => setState({ ...state, isEnabled: e.target.checked })} />}
            label={t("is-enabled")}
            labelPlacement="end"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          {t("cancel")}
        </Button>
        <Button color="primary" variant="contained" onClick={() => onConfirm(state)}>
          {t("confirm")}
        </Button>
      </DialogActions>
    </>)
}

export default AuthorizationSection